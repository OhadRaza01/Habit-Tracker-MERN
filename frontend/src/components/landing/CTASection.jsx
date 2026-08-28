import React from 'react'
import DecorativeCircle from '../shared/DecorativeCircle'
import Button from '../shared/Button'

export default function CTASection() {
    return (
        <section id='getstarted' className="relative overflow-hidden bg-[#ff5a36] px-6 py-20 md:px-12">
            <DecorativeCircle size={40} color="#ffffff" className="left-[8%] top-[20%] opacity-80" />
            <DecorativeCircle size={34} color="#c9dcef" className="right-[10%] bottom-[18%] opacity-80" />
            <DecorativeCircle size={28} color="#c9bfe0" className="right-[22%] top-[24%] opacity-70" />

            <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    One habit can change your day
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base text-white/90">
                    Start tracking your habits today and build the consistency that turns
                    small actions into lasting change.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button to="/signup" variant="solid">
                        Start Tracking Free
                    </Button>
                </div>
            </div>
        </section>
    )
}
