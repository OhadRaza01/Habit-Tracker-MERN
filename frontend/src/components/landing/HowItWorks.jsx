import React from 'react'

const steps = [
    {
        title: "Create your habits",
        description:
            "Add the habits you want to build and make them part of your daily routine.",
    },
    {
        title: "Check in every day",
        description:
            "Mark your habits as complete each day and let Habitly keep track of your progress.",
    },
    {
        title: "Build your streak",
        description:
            "Watch your streaks, completion rate, and overall consistency grow as you keep showing up.",
    },
];

export default function HowItWorks() {
    return (

        <section id='howitworks' className="bg-white px-6 py-24 md:px-12">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-[#14151a]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#14151a]">
                        How it works
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#14151a] sm:text-4xl">
                        Three steps to your first streak
                    </h2>
                </div>

                <div className="mt-16 flex flex-col gap-12 md:flex-row md:gap-4">
                    {
                        steps.map((step, i) => (
                            <div key={step.title} className="relative flex flex-1 flex-col items-center px-4 text-center">
                                {i !== steps.length - 1 && (
                                    <div className="absolute left-1/2 top-7 hidden h-px w-full border-t-2 border-dashed border-[#e5ddcf] md:block" />
                                )}
                                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5a36] text-lg font-bold text-white shadow-md">
                                    {i + 1}
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-[#14151a]">{step.title}</h3>
                                <p className="mt-2 max-w-60 text-sm leading-relaxed text-[#6b6b6b]">
                                    {step.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}
