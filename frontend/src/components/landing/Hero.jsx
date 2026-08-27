import DecorativeCircle from "../shared/DecorativeCircle";
import Button from "../shared/Button";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#ff5a36] pb-24">

            <DecorativeCircle size={60} color="#ffffff" className="left-[9%] top-[32%]" />
            <DecorativeCircle size={56} color="#c9bfe0" className="right-[8%] top-[30%]" />
            <DecorativeCircle size={44} color="#f4c6c0" className="left-[21%] top-[47%]" />
            <DecorativeCircle size={44} color="#c9dcef" className="left-[22%] top-[57%]" />
            <DecorativeCircle size={46} color="#14151a" className="right-[10%] top-[45%]" />
            <DecorativeCircle size={54} color="#c9dcef" className="right-[36%] top-[72%]" />

            {/* Hero content */}
            <div className="relative z-10 mx-auto  max-w-3xl px-6 pt-16 text-center">
                <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl">
                    Build Better Habits.
                    <br />
                    One Day at a Time.
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-base text-white/90 sm:text-lg">
                    Track your daily routines, stay consistent, and turn goals into
                    habits — all in one beautiful app.
                </p>

                {/* Buttons */}
                <div className="relative z-20 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button to="/signup" variant="solid">
                        Get Started Free
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 hidden h-110 w-95 md:block">
                {/* Settings screen */}
                <div
                    className="absolute -bottom-10 left-16 h-110 w-55 overflow-hidden rounded-[2.2rem] border-[6px] border-[#14151a] bg-[#faf7f2] shadow-2xl"
                    style={{ transform: "rotate(8deg)" }}
                >
                    <div className="flex items-center justify-between px-4 pb-1 pt-3 text-[10px] font-semibold text-[#1a1a1a]">
                        <span>9:41</span>
                        <span>📶 📡 🔋</span>
                    </div>
                    <div className="flex h-[calc(100%-28px)] flex-col px-4 pt-2">
                        <h3 className="text-[13px] font-bold text-[#1a1a1a]">Settings</h3>
                        <div className="mt-4 space-y-3">
                            {["Notifications", "Reminders", "Dark mode"].map((row, i) => (
                                <div
                                    key={row}
                                    className="flex items-center justify-between rounded-xl bg-[#f3ede4] px-3 py-2.5"
                                >
                                    <span className="text-[10px] font-medium text-[#3a3a3a]">{row}</span>
                                    <div className={`h-4 w-7 rounded-full p-0.5 ${i === 0 ? "bg-[#ff5a36]" : "bg-[#d8d2c6]"}`}>
                                        <div className={`h-3 w-3 rounded-full bg-white transition-transform ${i === 0 ? "translate-x-3" : "translate-x-0"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-auto pb-4 text-[9px] font-semibold text-[#8a8a8a]">Tracker settings</p>
                    </div>
                </div>

                {/* Habit tracker screen */}
                <div
                    className="absolute -bottom-15 -left-10 h-110 w-55 overflow-hidden rounded-[2.2rem] border-[6px] border-[#14151a] bg-[#faf7f2] shadow-2xl"
                    style={{ transform: "rotate(-10deg)" }}
                >
                    <div className="flex items-center justify-between px-4 pb-1 pt-3 text-[10px] font-semibold text-[#1a1a1a]">
                        <span>9:41</span>
                        <span>📶 📡 🔋</span>
                    </div>
                    <div className="flex h-[calc(100%-28px)] flex-col px-4 pt-2">
                        <h3 className="text-[15px] font-bold text-[#1a1a1a]">Habit tracker</h3>
                        <p className="mt-0.5 text-[10px] text-[#8a8a8a]">Keep track of your habits</p>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-[#f3ede4]">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: "conic-gradient(#ff5a36 0deg 320deg, transparent 320deg 360deg)",
                                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))",
                                    }}
                                />
                                <p className="text-lg font-bold text-[#1a1a1a]">89%</p>
                            </div>
                        </div>
                        <p className="pb-4 text-center text-[9px] text-[#8a8a8a]">of tasks completed weekly</p>
                    </div>
                </div>
            </div>

            {/* Phone mockups — right cluster: dashboard + goals */}
            <div className="absolute bottom-0 right-0 hidden h-110 w-95 md:block">
                {/* Dashboard screen */}
                <div
                    className="absolute -bottom-10 right-16 h-110 w-55 overflow-hidden rounded-[2.2rem] border-[6px] border-[#14151a] bg-[#faf7f2] shadow-2xl"
                    style={{ transform: "rotate(-8deg)" }}
                >
                    <div className="flex items-center justify-between px-4 pb-1 pt-3 text-[10px] font-semibold text-[#1a1a1a]">
                        <span>9:41</span>
                        <span>📶 📡 🔋</span>
                    </div>
                    <div className="flex h-[calc(100%-28px)] flex-col px-4 pt-2">
                        <h3 className="text-[15px] font-bold text-[#1a1a1a]">Dashboard</h3>
                        <p className="mt-0.5 text-[10px] text-[#8a8a8a]">Hello, it's Monday the 8th of April</p>
                        <p className="mt-4 text-[10px] font-semibold text-[#3a3a3a]">Tasks</p>
                        <div className="mt-2 space-y-2">
                            {[
                                { label: "Get groceries", done: false },
                                { label: "Read 10 pages", done: false },
                                { label: "Morning run", done: true },
                            ].map((task) => (
                                <div
                                    key={task.label}
                                    className="flex items-center justify-between rounded-xl bg-[#f3ede4] px-3 py-2"
                                >
                                    <span className="text-[10px] text-[#3a3a3a]">{task.label}</span>
                                    <div className={`flex h-4 w-4 items-center justify-center rounded-md ${task.done ? "bg-[#ff5a36]" : "border border-[#d8d2c6]"}`}>
                                        {task.done && (
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Goals screen */}
                <div
                    className="absolute -bottom-17.5 -right-10 h-110 w-55 overflow-hidden rounded-[2.2rem] border-[6px] border-[#14151a] bg-[#faf7f2] shadow-2xl"
                    style={{ transform: "rotate(10deg)" }}
                >
                    <div className="flex items-center justify-between px-4 pb-1 pt-3 text-[10px] font-semibold text-[#1a1a1a]">
                        <span>9:41</span>
                        <span>📶 📡 🔋</span>
                    </div>
                    <div className="flex h-[calc(100%-28px)] flex-col px-4 pt-2">
                        <h3 className="text-[15px] font-bold text-[#1a1a1a]">Goals</h3>
                        <p className="mt-0.5 text-[10px] text-[#8a8a8a]">Goals and milestones</p>
                        <div className="mt-4 rounded-xl bg-[#f3ede4] p-3">
                            <p className="text-[10px] font-semibold text-[#3a3a3a]">Run a marathon</p>
                            <p className="mt-1 text-[9px] leading-relaxed text-[#8a8a8a]">
                                Run 5 miles.
                            </p>
                            <div className="mt-3 h-1.5 w-full rounded-full bg-[#e5ddcf]">
                                <div className="h-1.5 w-2/3 rounded-full bg-[#ff5a36]" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f3ede4] px-3 py-2.5">
                            <span className="text-[10px] font-medium text-[#3a3a3a]">Read 12 books</span>
                            <span className="rounded-full bg-[#ff5a36] px-2 py-0.5 text-[8px] font-semibold text-white">
                                On track
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
