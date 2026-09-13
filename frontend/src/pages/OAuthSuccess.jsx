// src/pages/OAuthSuccess.jsx
import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function OAuthSuccess() {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/me`,
                    { withCredentials: true }
                )
                setUser(userResponse.data.data)
                navigate("/dashboard")
            } catch (error) {
                navigate("/login?error=google_auth_failed")
            }
        }

        fetchUser()
    }, [])

    return (
        <div className="flex h-screen w-full items-center justify-center bg-white">
            <p className="text-sm text-[#6b6b6b]">Signing you in...</p>
        </div>
    )
}