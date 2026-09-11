import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import StatCard from "../components/statistics/StatCard.jsx";
import ProgressRow from "../components/statistics/ProgressRow.jsx";
import DailyActivityGrid from "../components/statistics/DailyActivityGrid.jsx";
import WeeklyActivityChart from "../components/statistics/WeeklyActivityChart.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const heatmapColors = [
    "bg-[#f3ede4]",
    "bg-[#ffd6b5]",
    "bg-[#ffb07c]",
    "bg-[#ff8755]",
    "bg-[#ff5a36]",
];

const getDateKey = (date) =>
    new Date(date).toLocaleDateString("en-CA", {
        timeZone: "Asia/Karachi",
    });

const normalizeHabit = (habit) => ({
    id: habit._id || habit.id,
    name: habit.name || "Unnamed habit",
    completionRate: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    totalDaysTracked: 0,
    history: [],
    historyMap: {},
});

export default function StatisticsPage() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                setLoading(true);
                setError("");

                const habitResponse = await axios.get(`${API_URL}/habits`, {
                    withCredentials: true,
                });

                const habitList = Array.isArray(habitResponse?.data?.data)
                    ? habitResponse.data.data
                    : [];

                const habitsWithDetails = await Promise.all(
                    habitList.map(async (habit) => {
                        const [statsResult, historyResult] = await Promise.allSettled([
                            axios.get(`${API_URL}/habit-logs/${habit._id}/habit-stats`, {
                                withCredentials: true,
                            }),
                            axios.get(`${API_URL}/habit-logs/${habit._id}`, {
                                withCredentials: true,
                            }),
                        ]);

                        const stats = statsResult.status === "fulfilled"
                            ? statsResult.value?.data?.data || {}
                            : {};

                        const history = historyResult.status === "fulfilled"
                            ? historyResult.value?.data?.data || []
                            : [];

                        const historyMap = history.reduce((acc, entry) => {
                            const key = getDateKey(entry.date);
                            acc[key] = (acc[key] || 0) + 1;
                            return acc;
                        }, {});

                        return {
                            ...normalizeHabit(habit),
                            currentStreak: stats.currentStreak ?? 0,
                            bestStreak: stats.bestStreak ?? 0,
                            completionRate: stats.completionRate ?? 0,
                            totalCompletions: stats.totalCompletions ?? 0,
                            totalDaysTracked: stats.totalDaysTracked ?? 0,
                            history,
                            historyMap,
                        };
                    })
                );

                setHabits(habitsWithDetails);
            } catch (err) {
                console.error("Failed to load statistics:", err);
                setError(
                    err?.response?.data?.message ||
                    "Unable to load statistics right now. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStatisticsData();
    }, []);

    const contributionDays = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const completedByDate = {};

        habits.forEach((habit) => {
            Object.entries(habit.historyMap).forEach(([dateKey, count]) => {
                completedByDate[dateKey] = (completedByDate[dateKey] || 0) + count;
            });
        });

        const yearStart = new Date(today.getFullYear(), 0, 1);
        yearStart.setHours(0, 0, 0, 0);

        const days = [];

        let currentDate = new Date(yearStart);

        while (currentDate <= today) {
            const dateKey = getDateKey(currentDate);

            days.push({
                dateKey,
                label: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                value: completedByDate[dateKey] || 0,
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    }, [habits]);

    const contributionWeeks = useMemo(() => {
        const weeks = [];

        for (let index = 0; index < contributionDays.length; index += 7) {
            weeks.push(contributionDays.slice(index, index + 7));
        }

        return weeks;
    }, [contributionDays]);

    const weeklyData = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (6 - index));
            const dateKey = getDateKey(date);

            const value = habits.reduce((sum, habit) => {
                return sum + (habit.historyMap[dateKey] || 0);
            }, 0);

            return {
                label: date.toLocaleDateString("en-US", { weekday: "short" }),
                value,
            };
        });
    }, [habits]);

    const summary = useMemo(() => {
        const activeHabits = habits.length;
        const totalCompletions = habits.reduce(
            (sum, habit) => sum + Number(habit.totalCompletions || 0),
            0
        );
        const averageCompletionRate = activeHabits
            ? Math.round(
                habits.reduce((sum, habit) => sum + Number(habit.completionRate || 0), 0) /
                activeHabits
            )
            : 0;
        const completedToday = habits.filter((habit) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayKey = getDateKey(today);
            return (habit.historyMap[todayKey] || 0) > 0;
        }).length;
        const bestStreak = habits.reduce(
            (max, habit) => Math.max(max, Number(habit.bestStreak || 0)),
            0
        );
        const currentStreak = habits.reduce(
            (max, habit) => Math.max(max, Number(habit.currentStreak || 0)),
            0
        );

        return {
            activeHabits,
            totalCompletions,
            averageCompletionRate,
            completedToday,
            bestStreak,
            currentStreak,
        };
    }, [habits]);

    const topHabits = useMemo(() => {
        return [...habits]
            .sort((a, b) => (b.completionRate || 0) - (a.completionRate || 0))
            .slice(0, 5);
    }, [habits]);

    const maxWeeklyValue = Math.max(...weeklyData.map((item) => item.value), 1);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#8a8a8a]">Overview</p>
                    <h1 className="text-2xl font-bold text-[#14151a]">Statistics</h1>
                </div>
                <div className="rounded-full bg-[#faf7f2] px-3 py-1.5 text-xs font-semibold text-[#8a8a8a]">
                    Updated daily
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="rounded-2xl border border-[#eee7db] bg-white p-6 text-center text-sm text-[#8a8a8a]">
                    Loading statistics...
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Active habits"
                            value={summary.activeHabits}
                            detail="Currently tracked"
                            accent
                        />
                        <StatCard
                            label="Current streak"
                            value={`${summary.currentStreak} days`}
                            detail="Best streak: 1"
                            accent={false}
                        />
                        <StatCard
                            label="Completion rate"
                            value={`${summary.averageCompletionRate}%`}
                            detail={`${summary.completedToday} habits done today`}
                            accent={false}
                        />
                        <StatCard
                            label="Total completions"
                            value={summary.totalCompletions}
                            detail={`${summary.bestStreak} best streak`}
                            accent={false}
                        />
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
                        <div className="rounded-2xl border border-[#eee7db] bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-[#14151a]">Daily habit activity</h2>
                                    <p className="text-sm text-[#8a8a8a]">Your habit completion pattern across the full year</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-[#8a8a8a]">
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        {heatmapColors.map((color) => (
                                            <span
                                                key={color}
                                                className={`h-2.5 w-2.5 rounded-sm ${color}`}
                                            />
                                        ))}
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>

                            <DailyActivityGrid contributionWeeks={contributionWeeks} />
                        </div>

                        <div className="rounded-2xl border border-[#eee7db] bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-[#14151a]">Overall progress</h2>

                            <div className="mt-5 flex items-center justify-center">
                                <div
                                    className="relative flex h-32 w-32 items-center justify-center rounded-full"
                                    style={{
                                        background: `conic-gradient(#ff5a36 0 ${summary.averageCompletionRate}%, #f3ede4 ${summary.averageCompletionRate}% 100%)`,
                                    }}
                                >
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center">
                                        <div>
                                            <p className="text-xl font-extrabold text-[#14151a]">{summary.averageCompletionRate}%</p>
                                            <p className="text-[10px] uppercase tracking-wide text-[#8a8a8a]">Avg</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <ProgressRow label="Today" value={summary.completedToday} total={Math.max(summary.activeHabits, 1)} />
                                <ProgressRow label="This week" value={weeklyData.reduce((sum, item) => sum + item.value, 0)} total={Math.max(summary.activeHabits * 7, 1)} />
                                <ProgressRow label="Lifetime" value={summary.totalCompletions} total={Math.max(summary.activeHabits * 30, 1)} />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.2fr_1.8fr]">
                        <WeeklyActivityChart weeklyData={weeklyData} maxWeeklyValue={maxWeeklyValue} />

                        <div className="rounded-2xl border border-[#eee7db] bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-[#14151a]">Top habits</h2>

                            <div className="mt-5 space-y-4">
                                {topHabits.map((habit, index) => (
                                    <div key={habit.id} className="rounded-xl bg-[#faf7f2] p-3">
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a36]/10 text-[10px] font-bold text-[#ff5a36]">
                                                    {index + 1}
                                                </span>
                                                <span className="font-semibold text-[#14151a]">{habit.name}</span>
                                            </div>
                                            <span className="text-[#8a8a8a]">{habit.completionRate}%</span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-[#eee7db]">
                                            <div
                                                className="h-full rounded-full bg-[#ff5a36]"
                                                style={{ width: `${habit.completionRate}%` }}
                                            />
                                        </div>

                                        <div className="mt-2 flex items-center justify-between text-[11px] text-[#8a8a8a]">
                                            <span>{habit.totalCompletions} completions</span>
                                            <span>{habit.currentStreak} day streak</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

