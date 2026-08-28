import React from 'react'

const features = [
    {
        title: "Build daily habits",
        description:
            "Create the habits you want to build and make them part of your everyday routine.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                    d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 1 4-1 5-2 5a2.5 2.5 0 0 1-2.5-2.5c0-2 1.5-2.5 1.5-5.5C13.5 2.5 12.5 2 12 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 14a4 4 0 1 0 8 0c0-1-.5-3-2-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Track your progress",
        description:
            "Check off your habits every day and see how consistently you're sticking to your routine.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                    d="M5 12l4 4L19 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Keep your streak alive",
        description:
            "Build momentum with individual habit streaks and stay motivated to keep showing up every day.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                    d="M12 3v18M5 10l7-7 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Daily completion overview",
        description:
            "See how many of today's habits you've completed and get a clear picture of your daily progress.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M8 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Habit statistics",
        description:
            "Understand your consistency with completion rates, total days tracked, and other useful progress statistics.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="20" x2="6" y2="12" strokeLinecap="round" />
                <line x1="12" y1="20" x2="12" y2="5" strokeLinecap="round" />
                <line x1="18" y1="20" x2="18" y2="9" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Perfect-day streaks",
        description:
            "Challenge yourself to complete every habit in your routine and build a streak of perfect days.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
                <path d="M8 5H4a3 3 0 0 0 4 5" />
                <path d="M16 5h4a3 3 0 0 1-4 5" />
                <line x1="12" y1="13" x2="12" y2="17" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="17" x2="12" y2="20" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <section id='features' className="bg-[#faf7f2] px-6 py-24 md:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#14151a] sm:text-4xl">
                        Everything you need to see your progress
                    </h2>
                    <p className="mt-4 text-base text-[#6b6b6b]">
                        From single-habit streaks to your all-or-nothing perfect days,
                        Habitly turns every check-in into a story you can see.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className={`rounded-2xl border p-6 transition-shadow hover:shadow-lg border-[#eee7db] bg-white"
                                }`}
                        >
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff5a36]/10 text-[#ff5a36]"
                                    }`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-[#14151a]">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
