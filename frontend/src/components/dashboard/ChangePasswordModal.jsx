import { useState } from "react"
import axios from "axios"

export default function ChangePasswordModal({ onClose }) {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setMessage("")
        if (newPassword.length < 8) return setError("Password must be at least 8 characters.")
        if (newPassword !== confirmPassword) return setError("Passwords do not match.")

        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password/current`, { newPassword, confirmPassword }, { withCredentials: true })
            setMessage(response.data.message)
            setNewPassword("")
            setConfirmPassword("")
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to change password.")
        } finally {
            setLoading(false)
        }
    }

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#252321]/35 px-5" role="dialog" aria-modal="true" aria-labelledby="change-password-title"><form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f26b3a]">Account settings</p><h2 id="change-password-title" className="mt-2 text-xl font-bold">Change password</h2></div><button type="button" onClick={onClose} aria-label="Close password dialog" className="text-2xl text-[#928b83]">×</button></div><label className="mt-6 block text-xs font-bold text-[#756e67]">New password<input required minLength="8" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-[#e5ded7] px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]" /></label><label className="mt-4 block text-xs font-bold text-[#756e67]">Confirm password<input required minLength="8" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-[#e5ded7] px-3 py-2.5 text-sm outline-none focus:border-[#f26b3a]" /></label>{error && <p className="mt-4 text-xs text-[#c85b3c]">{error}</p>}{message && <p className="mt-4 text-xs text-[#4d9b76]">{message}</p>}<div className="mt-7 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#756e67] hover:bg-[#fbf6f1]">Cancel</button><button type="submit" disabled={loading} className="rounded-lg bg-[#f26b3a] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{loading ? "Saving..." : "Save password"}</button></div></form></div>
}
