import React, { useState } from 'react'
import axios from "axios"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/forgot-password`,
                { email }
            )
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex h-screen w-full flex-col items-center justify-center bg-white px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
                <h1 className="text-xl font-extrabold text-[#14151a]">Forgot Password</h1>
                <p className="text-xs text-[#8a8a8a]">Enter your email and we'll send you a reset link.</p>

                <input
                    type="email"
                    required
                    placeholder="your@example.com"
                    className="mt-1 w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 text-sm outline-none focus:border-[#ff5a36]"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {message && <p className="text-xs text-[#6b6b6b]">{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-sm bg-[#ff5a36] px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#ff5a36]/90"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </section>
    )
}