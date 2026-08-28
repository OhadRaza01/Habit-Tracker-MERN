import React from 'react'
import Hero from '../components/landing/Hero'
import Navbar from '../components/landing/NavBar'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#ff5a36]">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <CTASection />
            <Footer />
        </div>
    )
}
