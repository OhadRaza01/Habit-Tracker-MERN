import React from 'react'
import Hero from '../components/landing/Hero'
import Navbar from '../components/landing/NavBar'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#ff5a36]">
            <Navbar />
            <Hero />
        </div>
    )
}
