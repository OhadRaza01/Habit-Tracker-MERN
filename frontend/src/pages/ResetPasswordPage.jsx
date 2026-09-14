import React, { useState } from 'react'
import axios from "axios"
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function ResetPasswordPage() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setLoading(true)

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/reset-forgotten-password/${token}`,
                { newPassword, confirmPassword }
            )

            setMessage(response.data.message)

            setTimeout(() => navigate("/login"), 2000)

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex h-screen w-full flex-col items-center justify-center bg-white px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
                <h1 className="text-xl font-extrabold text-[#14151a]">Reset Password</h1>
                <p className="text-xs text-[#8a8a8a]">Enter your new password below.</p>

                <div className="relative mt-1">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        placeholder="New password"
                        className="w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 pr-10 text-sm outline-none focus:border-[#ff5a36]"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center justify-center text-[#bfbfbf] transition-colors hover:text-[#f96c4c]"
                    >
                        {showNewPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                                <circle cx="12" cy="12" r="3" />
                                <path d="M4 4l16 16" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="relative mt-1">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="Confirm new password"
                        className="w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 pr-10 text-sm outline-none focus:border-[#ff5a36]"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center justify-center text-[#bfbfbf] transition-colors hover:text-[#f96c4c]"
                    >
                        {showConfirmPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                                <circle cx="12" cy="12" r="3" />
                                <path d="M4 4l16 16" />
                            </svg>
                        )}
                    </button>
                </div>

                {error && <p className="text-xs text-red-700">{error}</p>}
                {message && <p className="text-xs text-green-700">{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-sm bg-[#ff5a36] px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#ff5a36]/90"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                {message && (
                    <p className="text-center text-xs text-[#6b6b6b]">
                        Redirecting to <Link to="/login" className="text-[#ff5a36] hover:underline">login</Link>...
                    </p>
                )}
            </form>
        </section>
    )
}