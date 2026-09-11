import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export default function HabitsPage() {

    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    const [habits, setHabits] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingArchived, setLoadingArchived] = useState(true);
    const [archivedHabits, setArchivedHabits] = useState([]);
    const [error, setError] = useState("");

    const getDateKey = (date) =>
        new Date(date).toLocaleDateString("en-CA", {
            timeZone: "Asia/Karachi",
        });

    const buildWeekLog = (history = []) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const completedDates = new Set(
            history
                .map((entry) => getDateKey(entry.date))
                .filter(Boolean)
        );

        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (6 - index));
            return completedDates.has(getDateKey(date));
        });
    };

    const normalizeHabit = (habit) => ({
        id: habit._id || habit.id,
        name: habit.name || "Unnamed habit",
        isArchived: Boolean(habit.isArchived),
        streak: 0,
        bestStreak: 0,
        completionRate: 0,
        daysTracked: 0,
        totalDaysTracked: 0,
        totalCompletions: 0,
        weekLog: [false, false, false, false, false, false, false],
    });

    const fetchHabits = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(`${API_URL}/habits`, {
                withCredentials: true,
            });

            const habitList = Array.isArray(response?.data?.data) ? response.data.data : [];

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

                    return {
                        ...normalizeHabit(habit),
                        streak: stats.currentStreak ?? 0,
                        bestStreak: stats.bestStreak ?? 0,
                        completionRate: stats.completionRate ?? 0,
                        daysTracked: stats.totalDaysTracked ?? 0,
                        totalDaysTracked: stats.totalDaysTracked ?? 0,
                        totalCompletions: stats.totalCompletions ?? 0,
                        weekLog: buildWeekLog(history),
                    };
                })
            );

            setHabits(habitsWithDetails);
        } catch (err) {
            console.error("Failed to fetch habits:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to load habits right now. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchArchivedHabits = async () => {
        try {
            setLoadingArchived(true);

            const response = await axios.get(`${API_URL}/habits/archived`, {
                withCredentials: true,
            });

            const habitList = Array.isArray(response?.data?.data) ? response.data.data : [];

            setArchivedHabits(habitList.map((habit) => normalizeHabit(habit)));
        } catch (err) {
            console.error("Failed to fetch archived habits:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to load archived habits right now. Please try again."
            );
        } finally {
            setLoadingArchived(false);
        }
    };

    useEffect(() => {
        fetchHabits();
        fetchArchivedHabits();
    }, []);

    const handleAddHabit = async (e) => {
        e.preventDefault();

        if (!newHabitName.trim()) return;

        try {
            setError("");

            const response = await axios.post(
                `${API_URL}/habits/create-habit`,
                { name: newHabitName.trim() },
                { withCredentials: true }
            );

            const newHabit = normalizeHabit(response?.data?.data || {});
            setHabits((prev) => [newHabit, ...prev]);
            setNewHabitName("");
            setIsAdding(false);
        } catch (err) {
            console.error("Failed to add habit:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to add a new habit. Please try again."
            );
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();

        try {
            setError("");

            await axios.delete(`${API_URL}/habits/${id}`, {
                withCredentials: true,
            });

            setHabits((prev) => prev.filter((habit) => habit.id !== id));
            setArchivedHabits((prev) => prev.filter((habit) => habit.id !== id));
            setSelectedHabit((prev) => (prev?.id === id ? null : prev));
        } catch (err) {
            console.error("Failed to delete habit:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to delete this habit. Please try again."
            );
        }
    };

    const handleToggleArchive = async (id, e) => {
        e.stopPropagation();

        try {
            setError("");

            const response = await axios.patch(
                `${API_URL}/habits/${id}/toggle-status`,
                {},
                { withCredentials: true }
            );

            const toggledHabit = response?.data?.data || {};
            const isNowArchived = Boolean(toggledHabit.isArchived);

            setHabits((prev) => {
                const filtered = prev.filter((habit) => habit.id !== id);

                if (isNowArchived) {
                    return filtered;
                }

                return [normalizeHabit(toggledHabit), ...filtered];
            });

            setArchivedHabits((prev) => {
                const filtered = prev.filter((habit) => habit.id !== id);

                if (!isNowArchived) {
                    return filtered;
                }

                return [normalizeHabit(toggledHabit), ...filtered];
            });

            setSelectedHabit((prev) => (prev?.id === id ? null : prev));
        } catch (err) {
            console.error("Failed to update archive status:", err);
            setError(
                err?.response?.data?.message ||
                "Unable to update this habit. Please try again."
            );
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-[#14151a]">Habits</h1>
                    <p className="mt-1 text-sm text-[#8a8a8a]">
                        {habits.length} habit{habits.length !== 1 ? "s" : ""} tracked — tap any habit for details
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#ff5a36] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#ff5a36]/90"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                        <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    </svg>
                    Add Habit
                </button>
            </div>

            {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading && (
                <div className="mt-6 rounded-2xl border border-[#eee7db] bg-white p-6 text-center text-sm text-[#8a8a8a]">
                    Loading habits...
                </div>
            )}

            {!loading && isAdding && (
                <form
                    onSubmit={handleAddHabit}
                    className="mt-5 flex items-center gap-3 rounded-2xl border border-[#eee7db] bg-white p-4"
                >
                    <input
                        type="text"
                        autoFocus
                        value={newHabitName}
                        onChange={(e) => setNewHabitName(e.target.value)}
                        placeholder="e.g. Journal before bed"
                        className="flex-1 rounded-xl border border-[#eee7db] bg-[#faf7f2] px-4 py-2.5 text-sm text-[#14151a] placeholder:text-[#a3a3a3] outline-none focus:border-[#ff5a36] focus:bg-white focus:ring-2 focus:ring-[#ff5a36]/20"
                    />
                    <button
                        type="submit"
                        className="rounded-xl bg-[#ff5a36] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff5a36]/90"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsAdding(false);
                            setNewHabitName("");
                        }}
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#8a8a8a] hover:text-[#14151a]"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {!loading && (
                <div className="mt-6 space-y-3">
                    {habits.map((habit) => (
                        <div
                            key={habit.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedHabit(habit)}
                            onKeyDown={(e) => e.key === "Enter" && setSelectedHabit(habit)}
                            className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#eee7db] bg-white p-5 transition-colors hover:border-[#ff5a36]/30 hover:bg-[#fff8f5]"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-[#14151a]">{habit.name}</h3>
                                <div className="mt-1 flex items-center gap-4 text-xs text-[#8a8a8a]">
                                    <span className="flex items-center gap-1">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 1 4-1 5-2 5a2.5 2.5 0 0 1-2.5-2.5c0-2 1.5-2.5 1.5-5.5C13.5 2.5 12.5 2 12 2z" />
                                        </svg>
                                        {habit.streak} day streak
                                    </span>
                                    <span>{habit.completionRate}% completion</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-2 w-24 overflow-hidden rounded-full bg-[#f3ede4]">
                                    <div
                                        className="h-full rounded-full bg-[#ff5a36]"
                                        style={{ width: `${habit.completionRate}%` }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => handleDelete(habit.id, e)}
                                    aria-label={`Delete ${habit.name}`}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#a3a3a3] transition-colors hover:bg-[#fff3ee] hover:text-[#ff5a36]"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" />
                                        <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9c2b3" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ))}

                    {habits.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-[#eee7db] bg-white p-10 text-center text-sm text-[#8a8a8a]">
                            No habits yet — add your first one to get started.
                        </div>
                    )}
                </div>
            )}

            {!loadingArchived && (
                <div className="mt-8 rounded-2xl border border-[#eee7db] bg-white p-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#14151a]">Archived habits</h2>
                        <span className="rounded-full bg-[#faf7f2] px-2.5 py-1 text-xs font-semibold text-[#8a8a8a]">
                            {archivedHabits.length}
                        </span>
                    </div>

                    {loadingArchived ? (
                        <div className="mt-4 text-sm text-[#8a8a8a]">Loading archived habits...</div>
                    ) : archivedHabits.length === 0 ? (
                        <div className="mt-4 rounded-xl border border-dashed border-[#eee7db] bg-[#faf7f2] p-5 text-center text-sm text-[#8a8a8a]">
                            No archived habits yet.
                        </div>
                    ) : (
                        <div className="mt-4 space-y-3">
                            {archivedHabits.map((habit) => (
                                <div
                                    key={habit.id}
                                    className="flex items-center justify-between rounded-xl border border-[#eee7db] bg-[#faf7f2] p-4"
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#14151a]">{habit.name}</h3>
                                        <p className="mt-1 text-xs text-[#8a8a8a]">Archived habit</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => handleToggleArchive(habit.id, e)}
                                            className="rounded-xl bg-[#ff5a36] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ff5a36]/90"
                                        >
                                            Restore
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(habit.id, e)}
                                            className="rounded-xl border border-[#ff5a36]/30 px-3 py-2 text-xs font-semibold text-[#ff5a36] transition-colors hover:bg-[#fff3ee]"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Habit detail modal */}
            {selectedHabit && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
                    onClick={() => setSelectedHabit(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-bold text-[#14151a]">{selectedHabit.name}</h2>
                            <button
                                type="button"
                                onClick={() => setSelectedHabit(null)}
                                aria-label="Close"
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[#a3a3a3] hover:bg-[#faf7f2] hover:text-[#14151a]"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Stat row */}
                        <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                            <div className="rounded-xl bg-[#faf7f2] p-3">
                                <p className="text-lg font-extrabold text-[#ff5a36]">{selectedHabit.streak}</p>
                                <p className="mt-0.5 text-[11px] text-[#8a8a8a]">Current streak</p>
                            </div>
                            <div className="rounded-xl bg-[#faf7f2] p-3">
                                <p className="text-lg font-extrabold text-[#14151a]">{selectedHabit.bestStreak}</p>
                                <p className="mt-0.5 text-[11px] text-[#8a8a8a]">Best streak</p>
                            </div>
                            <div className="rounded-xl bg-[#faf7f2] p-3">
                                <p className="text-lg font-extrabold text-[#14151a]">{selectedHabit.completionRate}%</p>
                                <p className="mt-0.5 text-[11px] text-[#8a8a8a]">Completion</p>
                            </div>
                            <div className="rounded-xl bg-[#faf7f2] p-3">
                                <p className="text-lg font-extrabold text-[#14151a]">{selectedHabit.daysTracked}</p>
                                <p className="mt-0.5 text-[11px] text-[#8a8a8a]">Days tracked</p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-[#fff8f5] p-3 text-sm text-[#8a8a8a]">
                            <span className="font-semibold text-[#14151a]">Total completions:</span> {selectedHabit.totalCompletions}
                        </div>

                        {/* Last 7 days */}
                        <div className="mt-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8a8a]">Last 7 days</p>
                            <div className="mt-2 flex justify-between">
                                {selectedHabit.weekLog.map((done, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${done ? "bg-[#ff5a36] text-white" : "bg-[#f3ede4] text-[#c9c2b3]"
                                                }`}
                                        >
                                            {done && (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-[#a3a3a3]">{dayLabels[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button
                                type="button"
                                onClick={(e) => handleToggleArchive(selectedHabit.id, e)}
                                className="w-full rounded-xl bg-[#ff5a36] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff5a36]/90"
                            >
                                {selectedHabit.isArchived ? "Move back to active habits" : "Archive current habit"}
                            </button>

                            <button
                                type="button"
                                onClick={(e) => handleDelete(selectedHabit.id, e)}
                                className="w-full rounded-xl border border-[#ff5a36]/30 px-4 py-2.5 text-sm font-semibold text-[#ff5a36] transition-colors hover:bg-[#fff3ee]"
                            >
                                Delete habit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
