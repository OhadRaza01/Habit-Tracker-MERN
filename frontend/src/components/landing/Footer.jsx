import React from 'react'

export default function Footer() {

    const links = [
        { title: "Home", id: "home" },
        { title: "Features", id: "features" },
        { title: "How it works", id: "howitworks" },
        { title: "Get started", id: "getstarted" }
    ];

    return (
        <footer className="bg-black px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">

                <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

                    {/* Logo / Brand */}
                    <div>
                        <h2 className="text-2xl font-bold">Habitly</h2>
                        <p className="mt-2 text-sm text-white/60">
                            Build better habits, one day at a time.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-6 text-sm text-white/70">

                        {
                            links.map((link) => {
                                return <a
                                    href={`#${link.id}`} className="transition hover:text-white">
                                    {link.title}
                                </a>
                            })
                        }

                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-center text-sm text-white/50">
                        © 2026 Habitly. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}
