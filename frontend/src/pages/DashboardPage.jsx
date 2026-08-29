import StatCard from "../components/dashboard/StatCard";
import { useState } from "react";

const initialHabits = [
    { id: 1, name: "Morning run", streak: 12, completed: true },
    { id: 2, name: "Read 10 pages", streak: 5, completed: false },
    { id: 3, name: "Drink 8 glasses of water", streak: 21, completed: false },
    { id: 4, name: "Meditate", streak: 8, completed: false },
    { id: 5, name: "Meditate", streak: 8, completed: false },
    { id: 6, name: "Meditate", streak: 8, completed: false }
];

export default function DashboardPage() {
    const [habits, setHabits] = useState(initialHabits);

    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id ? { ...habit, completed: !habit.completed } : habit
            )
        );
    };

    const completedCount = habits.filter((h) => h.completed).length;
    const totalCount = habits.length;
    const completionRate = Math.round((completedCount / totalCount) * 100);
    const currentStreak = Math.max(...habits.map((h) => h.streak));

    return (
        <div>
            {/* Stats row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <StatCard
                    label="Current streak"
                    value={`${currentStreak} days`}
                    accent
                    icon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 1 4-1 5-2 5a2.5 2.5 0 0 1-2.5-2.5c0-2 1.5-2.5 1.5-5.5C13.5 2.5 12.5 2 12 2z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 14a4 4 0 1 0 8 0c0-1-.5-3-2-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                />
                <StatCard
                    label="Habits completed today"
                    value={`${completedCount}/${totalCount}`}
                    icon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="12" y1="6" x2="20" y2="6" strokeLinecap="round" />
                            <line x1="4" y1="14" x2="20" y2="14" strokeLinecap="round" />
                            <line x1="4" y1="19" x2="14" y2="19" strokeLinecap="round" />
                        </svg>
                    }
                />
                <StatCard
                    label="Completion rate"
                    value={`${completionRate}%`}
                    icon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="round" />
                            <circle cx="6.5" cy="6.5" r="2.5" />
                            <circle cx="17.5" cy="17.5" r="2.5" />
                        </svg>
                    }
                />
            </div>

            {/* Today's habits */}
            <div className="mt-8 rounded-2xl border border-[#eee7db] bg-white p-6">
                <h2 className="text-lg font-bold text-[#14151a]">Today's habits</h2>
                <p className="mt-1 text-sm text-[#8a8a8a]">Mark each habit off as you complete it.</p>

                <div className="mt-5 space-y-3">
                    {habits.map((habit) => (
                        <button
                            key={habit.id}
                            type="button"
                            onClick={() => toggleHabit(habit.id)}
                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors ${habit.completed
                                ? "border-[#ff5a36]/20 bg-[#fff3ee]"
                                : "border-[#eee7db] bg-[#faf7f2] hover:border-[#ff5a36]/30"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${habit.completed
                                        ? "border-[#ff5a36] bg-[#ff5a36]"
                                        : "border-[#d8d2c6] bg-white"
                                        }`}
                                >
                                    {habit.completed && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span
                                    className={`text-sm font-medium ${habit.completed ? "text-[#14151a] line-through decoration-[#ff5a36]/40" : "text-[#14151a]"
                                        }`}
                                >
                                    {habit.name}
                                </span>
                            </div>
                            <span className="text-xs font-medium text-[#8a8a8a]">{habit.streak} day streak</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
