import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function SignupPage() {
    const [avatarName, setAvatarName] = useState("");
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const validateForm = () => {

        if (fullname.length < 3) {
            setError("Fullname must be at least 3 characters");
            return false;
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters");
            return false;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError("Username can only contain letters, numbers, and underscores");
            return false;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) return;

        const formData = new FormData();
        formData.append('fullName', fullname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        const file = document.querySelector('input[name="avatar"]').files[0];
        if (file) {
            formData.append('avatar', file);
        }

        const url = "http://localhost:8000/api/v1/users/register";

        try {

            setLoading(true)

            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log(response.data)

            return response.data;

        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <section id="signup" className="flex h-screen w-full flex-col overflow-hidden bg-white">
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
                        Create new Account
                    </h1>
                    <p className="mt-1 text-xs text-[#8a8a8a]">
                        Your journey to better habits starts here
                    </p>
                </div>

                {/*Input Fields */}
                <div className="mt-6 w-full max-w-sm space-y-3">
                    <div>
                        <label htmlFor="fullname" className="text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
                            Full name <span className="text-[#ff5a36]">*</span>
                        </label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            placeholder="Enter your full name"
                            required
                            className="mt-1 w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 text-sm text-[#14151a] placeholder:text-[#a3a3a3] outline-none transition-colors focus:border-[#ff5a36] focus:bg-white focus:ring-2 focus:ring-[#ff5a36]/20"
                            onChange={(e) => {
                                setFullname(e.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
                            Username <span className="text-[#ff5a36]">*</span>
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            required
                            className="mt-1 w-full rounded-sm border border-[#eee7db] bg-[#faf7f2] px-4 py-2 text-sm text-[#14151a] placeholder:text-[#a3a3a3] outline-none transition-colors focus:border-[#ff5a36] focus:bg-white focus:ring-2 focus:ring-[#ff5a36]/20"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>

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

                    <div>
                        <label htmlFor="avatar" className="text-[11px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
                            Avatar
                        </label>
                        <label
                            htmlFor="avatar"
                            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-[#eee7db] bg-[#faf7f2] px-4 py-2 text-sm text-[#8a8a8a] transition-colors hover:border-[#ff5a36] hover:text-[#ff5a36]"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {avatarName || "Upload avatar"}
                        </label>
                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setAvatarName(e.target.files?.[0]?.name || "")}
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
                            Creating Account...
                        </button> :
                        <button
                            type="submit"
                            className="w-full rounded-sm bg-[#ff5a36] px-6 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#ff5a36]/90"

                        >
                            Sign Up
                        </button>}

                    <p className="text-center text-xs text-[#6b6b6b]">
                        Already have an account?{" "}
                        <a to="/login" className="font-semibold text-[#ff5a36] hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </form>
        </section>
    );
}