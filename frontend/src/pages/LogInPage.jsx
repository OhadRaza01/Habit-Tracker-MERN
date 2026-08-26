import React, { useState } from 'react'
import axios from "axios"

export default function LogInPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    function validateForm() {

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return false;
        }

        setError("");
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validateForm()
        if (!isValid) {
            return
        }

        const url = "http://localhost:8000/api/v1/users/login"
        const payload = {
            email,
            password
        }

        try {

            setLoading(true)

            const response = await axios.post(url, payload)
            
            return response.data

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message)
            } else if (error.request) {
                setError("Please check your internet and try again")
            } else {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="signin" className="flex h-screen w-full flex-col overflow-hidden bg-white">
            <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col items-center justify-center px-6"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-[#f0e9de]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff5a36">
                            <path d="M4 2h13a3 3 0 0 1 3 3v17l-9.5-5L4 22V2z" />
                        </svg>
                    </div>
                    <h1 className="mt-3 text-xl font-extrabold text-[#14151a] sm:text-2xl">
                        Welcome to Habitly
                    </h1>
                    <p className="mt-1 text-xs text-[#8a8a8a]">
                        Your journey to better habits starts here
                    </p>
                </div>

                {/*Input Fields */}
                <div className="mt-6 w-full max-w-sm space-y-3">

                    <div>
                        <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
                            Email <span className="text-[#ff5a36]">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@example.com"
                            required
                            className="mt-1 w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 text-sm text-[#14151a] placeholder:text-[#a3a3a3] outline-none transition-colors focus:border-[#ff5a36] focus:bg-white focus:ring-2 focus:ring-[#ff5a36]/20"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
                            Password <span className="text-[#ff5a36]">*</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="mt-1 w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 text-sm text-[#14151a] placeholder:text-[#a3a3a3] outline-none transition-colors focus:border-[#ff5a36] focus:bg-white focus:ring-2 focus:ring-[#ff5a36]/20"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>

                    {error ?
                        <div className=" w-full text-center text-red-600 text-xs" >{error}</div> :
                        ""}

                    {loading ?
                        <button
                            className="w-full rounded-sm bg-[#ff5a36] px-6 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#ff5a36]/90"
                            disabled
                        >
                            Signing In...
                        </button> :
                        <button
                            type="submit"
                            className="w-full rounded-sm bg-[#ff5a36] px-6 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#ff5a36]/90"

                        >
                            Sign In
                        </button>}

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                        <div className="h-px flex-1 bg-[#eee7db]" />
                        <span className="text-xs text-[#a3a3a3]">or</span>
                        <div className="h-px flex-1 bg-[#eee7db]" />
                    </div>

                    <button
                        type="button"
                        // onClick={() => { for later implementation }}
                        className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#eee7db] bg-white px-6 py-2 text-sm font-semibold text-[#14151a] shadow-sm transition-colors hover:bg-[#faf7f2]"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24z" />
                            <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1z" />
                            <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
                        </svg>
                        Sign in with Google
                    </button>


                    <p className="text-center text-xs text-[#6b6b6b]">
                        Create an account?{" "}
                        <a href='#signup' className="font-semibold text-[#ff5a36] hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </form>
        </section>
    )
}
