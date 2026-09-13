import React from 'react'
import { Navigate } from 'react-router-dom'
import LoadingScreen from '../components/shared/LoadingScreen'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {

    const { user, loading } = useAuth()

    if (loading) {
        return <LoadingScreen />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="text-4xl flex justify-center items-center h-screen bg-gray-900 text-amber-50">
            Dashboard {user.username}
        </div>
    )
}
