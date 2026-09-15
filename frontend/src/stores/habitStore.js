import axios from "axios"
import { create } from "zustand"

const apiUrl = import.meta.env.VITE_API_URL
const palette = ["bg-[#fff0e8]", "bg-[#f2efff]", "bg-[#eaf7fb]", "bg-[#fff7df]"]
const STALE_MS = 60 * 1000 // how long cached data is considered "fresh" (tune as needed)

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

export const getDateKey = (date) => {
    const parts = dateFormatter.formatToParts(new Date(date))
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))
    return `${values.year}-${values.month}-${values.day}`
}

export const getWeekDateKeys = () => {
    const todayKey = getDateKey(new Date())
    const [year, month, day] = todayKey.split("-").map(Number)
    const today = new Date(Date.UTC(year, month - 1, day, 12))
    const daysSinceMonday = (today.getUTCDay() + 6) % 7

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(Date.UTC(year, month - 1, day - daysSinceMonday + index, 12))
        return getDateKey(date)
    })
}

const normalizeHabit = (habit, index, logs = [], dateKeys = getWeekDateKeys()) => ({
    ...habit,
    id: habit._id,
    isArchived: Boolean(habit.isArchived),
    target: Number(habit.target ?? 1),
    meta: `${habit.category || "General"} · ${habit.frequency === "weekly" ? "Weekly" : "Daily"}`,
    icon: "✦",
    color: palette[index % palette.length],
    totalCompletions: logs.length,
    completedDays: dateKeys.map((dateKey) => logs.some((log) => getDateKey(log.date) === dateKey)),
})

const requestConfig = { withCredentials: true }

export const useHabitStore = create((set, get) => ({
    habits: [],
    loading: false,
    error: null,
    habitStats: {},
    dashboardStats: null,
    lastFetched: null,
    pendingToggles: new Set(), // habit ids currently mid-toggle, so UI can disable the button

    // Pass force=true to bypass the cache (e.g. a manual refresh button)
    fetchHabits: async (force = false) => {
        const { lastFetched, habits } = get()
        const isFresh = !force && lastFetched && habits.length && Date.now() - lastFetched < STALE_MS
        if (isFresh) return

        set({ loading: true, error: null })
        try {
            const dateKeys = getWeekDateKeys()
            const [dashboardResponse, archivedResponse] = await Promise.all([
                axios.get(`${apiUrl}/dashboard`, requestConfig),
                axios.get(`${apiUrl}/habits/archived`, requestConfig),
            ])
            const dashboardData = dashboardResponse.data.data
            const rawHabits = [...dashboardData.habits, ...archivedResponse.data.data]

            // NOTE: this fires one log request per habit (N+1). Fine for a handful of
            // habits, but if this becomes slow, replace with a single backend endpoint
            // that joins habits + this week's logs in one query (e.g. Mongo $lookup)
            // and drop this Promise.all entirely.
            const habitsWithLogs = await Promise.all(rawHabits.map(async (habit) => {
                const historyResponse = await axios.get(`${apiUrl}/habit-logs/${habit._id}`, requestConfig)
                return { habit, logs: historyResponse.data.data }
            }))

            const activeHabits = habitsWithLogs
                .filter(({ habit }) => !habit.isArchived)
                .map(({ habit, logs }, index) => normalizeHabit(habit, index, logs, dateKeys))
            const archivedHabits = habitsWithLogs
                .filter(({ habit }) => habit.isArchived)
                .map(({ habit, logs }, index) => normalizeHabit(habit, activeHabits.length + index, logs, dateKeys))

            set({
                habits: [...activeHabits, ...archivedHabits],
                dashboardStats: dashboardData.statistics,
                loading: false,
                lastFetched: Date.now(),
            })
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Unable to load habits." })
        }
    },

    // Optimistic: UI updates instantly, network call happens after, rolls back on failure
    toggleHabit: async (habitId, dayIndex) => {
        const habit = get().habits.find((item) => item.id === habitId)
        if (!habit) return false
        if (get().pendingToggles.has(habitId)) return false // ignore double-taps mid-request

        const wasCompleted = habit.completedDays[dayIndex]

        set((state) => ({
            pendingToggles: new Set(state.pendingToggles).add(habitId),
            habits: state.habits.map((item) => item.id === habitId
                ? {
                    ...item,
                    totalCompletions: item.totalCompletions + (wasCompleted ? -1 : 1),
                    completedDays: item.completedDays.map((completed, index) =>
                        index === dayIndex ? !completed : completed),
                }
                : item),
        }))

        try {
            if (wasCompleted) {
                await axios.delete(`${apiUrl}/habit-logs/${habitId}`, requestConfig)
            } else {
                await axios.post(`${apiUrl}/habit-logs/${habitId}`, {}, requestConfig)
            }
            set((state) => {
                const next = new Set(state.pendingToggles)
                next.delete(habitId)
                return { pendingToggles: next }
            })
            return true
        } catch (error) {
            // rollback to the pre-toggle state
            set((state) => {
                const next = new Set(state.pendingToggles)
                next.delete(habitId)
                return {
                    pendingToggles: next,
                    error: error.response?.data?.message || "Unable to update habit completion.",
                    habits: state.habits.map((item) => item.id === habitId
                        ? {
                            ...item,
                            totalCompletions: item.totalCompletions + (wasCompleted ? 1 : -1),
                            completedDays: item.completedDays.map((completed, index) =>
                                index === dayIndex ? !completed : completed),
                        }
                        : item),
                }
            })
            return false
        }
    },

    fetchHabitStats: async (habitId) => {
        try {
            const response = await axios.get(`${apiUrl}/habit-logs/${habitId}/habit-stats`, requestConfig)
            set((state) => ({ habitStats: { ...state.habitStats, [habitId]: response.data.data } }))
            return response.data.data
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to load habit statistics." })
            return null
        }
    },

    addHabit: async (habitData) => {
        try {
            const response = await axios.post(`${apiUrl}/habits/create-habit`, habitData, requestConfig)
            // safe to use normalizeHabit with no logs here — a brand-new habit has no history yet
            set((state) => {
                const newHabit = normalizeHabit(response.data.data, state.habits.length)
                return { habits: [...state.habits, newHabit] }
            })
            return true
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to create habit." })
            return false
        }
    },

    // Only patches the fields that can actually change from an edit — keeps
    // completedDays / totalCompletions / color / icon intact from existing state
    updateHabit: async (habitId, habitData) => {
        try {
            const response = await axios.patch(`${apiUrl}/habits/${habitId}`, habitData, requestConfig)
            const updated = response.data.data

            set((state) => ({
                habits: state.habits.map((habit) => habit.id !== habitId ? habit : {
                    ...habit,
                    name: updated.name,
                    category: updated.category,
                    frequency: updated.frequency,
                    target: Number(updated.target ?? habit.target),
                    isArchived: Boolean(updated.isArchived),
                    meta: `${updated.category || "General"} · ${updated.frequency === "weekly" ? "Weekly" : "Daily"}`,
                }),
            }))
            return true
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to update habit." })
            return false
        }
    },

    // Only flips isArchived — doesn't touch logs/color/anything else
    setArchived: async (habitId) => {
        try {
            const response = await axios.patch(`${apiUrl}/habits/${habitId}/toggle-status`, {}, requestConfig)
            set((state) => ({
                habits: state.habits.map((habit) => habit.id === habitId
                    ? { ...habit, isArchived: Boolean(response.data.data.isArchived) }
                    : habit),
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to update habit status." })
        }
    },

    deleteHabit: async (habitId) => {
        // optimistic remove, restore on failure
        const previousHabits = get().habits
        set((state) => ({ habits: state.habits.filter((habit) => habit.id !== habitId) }))
        try {
            await axios.delete(`${apiUrl}/habits/${habitId}`, requestConfig)
        } catch (error) {
            set({
                habits: previousHabits,
                error: error.response?.data?.message || "Unable to delete habit.",
            })
        }
    },
}))