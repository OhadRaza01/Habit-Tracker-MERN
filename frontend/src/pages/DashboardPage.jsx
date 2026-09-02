import StatCard from "../components/dashboard/StatCard";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../src/contexts/AuthContext"
import axios from "axios";


export default function DashboardPage() {
    const [habits, setHabits] = useState(null);
    const [statistics, setStatistics] = useState({
        completed: 0,
        totalHabits: 0,
        remaining: 0,
        completionRate: 0,
        currentStreak: 0
    })

    const fetchDashboardStatistics = useCallback(async () => {
        const url = "http://localhost:8000/api/v1/dashboard/"

        try {
            const response = await axios.get(url, {
                withCredentials: true
            })

            const { habits, statistics } = response.data.data

            setStatistics(statistics)
            setHabits(habits)

        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchDashboardStatistics()
    }, [fetchDashboardStatistics])

    async function toggleHabit(habitId, isCompleted) {

        setHabits((prevHabits) =>
            prevHabits.map((habit) =>
                habit._id === habitId
                    ? { ...habit, completed: !isCompleted }
                    : habit
            )
        );

        setStatistics((prev) => {
            const completed = isCompleted ? prev.completed - 1 : prev.completed + 1
            const totalHabits = prev.totalHabits
            const remaining = totalHabits - completed
            const completionRate = totalHabits > 0
                ? Math.round((completed / totalHabits) * 100)
                : 0

            return {
                ...prev,
                completed,
                remaining,
                completionRate
            }
        })

        try {
            const url = `http://localhost:8000/api/v1/habit-logs/${habitId}`

            if (isCompleted) {
                await axios.delete(url, { withCredentials: true })
            } else {
                await axios.post(url, {}, { withCredentials: true })
            }

            fetchDashboardStatistics()

        } catch (error) {
            console.log(error.response?.data?.message || "Something went wrong please try again")

            fetchDashboardStatistics()
        }
    }

    return (
        <div>
            {/* Stats row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <StatCard
                    label="Current streak"
                    value={`${statistics?.currentStreak} days`}
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
                    value={`${statistics?.completed}/${statistics?.totalHabits}`}
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
                    value={`${statistics?.completionRate}%`}
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
                    {habits && habits.map((habit) => (
                        <button
                            key={habit._id}
                            type="button"
                            onClick={() => toggleHabit(habit._id, habit.completed)}
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