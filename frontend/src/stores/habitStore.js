import axios from "axios"
import { create } from "zustand"

const apiUrl = import.meta.env.VITE_API_URL
const palette = ["bg-[#fff0e8]", "bg-[#f2efff]", "bg-[#eaf7fb]", "bg-[#fff7df]"]

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

export const useHabitStore = create((set) => ({
    habits: [],
    loading: false,
    error: null,
    habitStats: {},
    dashboardStats: null,

    fetchHabits: async () => {
        set({ loading: true, error: null })
        try {
            const dateKeys = getWeekDateKeys()
            const [dashboardResponse, archivedResponse] = await Promise.all([
                axios.get(`${apiUrl}/dashboard`, requestConfig),
                axios.get(`${apiUrl}/habits/archived`, requestConfig),
            ])
            const dashboardData = dashboardResponse.data.data
            const rawHabits = [...dashboardData.habits, ...archivedResponse.data.data]
            const habitsWithLogs = await Promise.all(rawHabits.map(async (habit) => {
                const historyResponse = await axios.get(`${apiUrl}/habit-logs/${habit._id}`, requestConfig)
                return { habit, logs: historyResponse.data.data }
            }))
            const activeHabits = habitsWithLogs.filter(({ habit }) => !habit.isArchived).map(({ habit, logs }, index) => normalizeHabit(habit, index, logs, dateKeys))
            const archivedHabits = habitsWithLogs.filter(({ habit }) => habit.isArchived).map(({ habit, logs }, index) => normalizeHabit(habit, activeHabits.length + index, logs, dateKeys))
            set({ habits: [...activeHabits, ...archivedHabits], dashboardStats: dashboardData.statistics, loading: false })
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Unable to load habits." })
        }
    },

    toggleHabit: async (habitId, dayIndex) => {
        const habit = useHabitStore.getState().habits.find((item) => item.id === habitId)
        if (!habit) return false

        const isCompleted = habit.completedDays[dayIndex]
        try {
            if (isCompleted) {
                await axios.delete(`${apiUrl}/habit-logs/${habitId}`, requestConfig)
            } else {
                await axios.post(`${apiUrl}/habit-logs/${habitId}`, {}, requestConfig)
            }
            set((state) => ({
                habits: state.habits.map((item) => item.id === habitId
                    ? { ...item, totalCompletions: item.totalCompletions + (isCompleted ? -1 : 1), completedDays: item.completedDays.map((completed, index) => index === dayIndex ? !completed : completed) }
                    : item),
            }))
            return true
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to update habit completion." })
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
            const newHabit = normalizeHabit(response.data.data, 0)
            set((state) => ({ habits: [...state.habits, { ...newHabit, color: palette[state.habits.length % palette.length] }] }))
            return true
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to create habit." })
            return false
        }
    },

    updateHabit: async (habitId, habitData) => {
        try {
            const response = await axios.patch(`${apiUrl}/habits/${habitId}`, habitData, requestConfig)
            const updatedHabit = normalizeHabit(response.data.data, 0)
            set((state) => ({ habits: state.habits.map((habit) => habit.id === habitId ? { ...habit, ...updatedHabit, color: habit.color } : habit) }))
            return true
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to update habit." })
            return false
        }
    },

    setArchived: async (habitId) => {
        try {
            const response = await axios.patch(`${apiUrl}/habits/${habitId}/toggle-status`, {}, requestConfig)
            const updatedHabit = normalizeHabit(response.data.data, 0)
            set((state) => ({ habits: state.habits.map((habit) => habit.id === habitId ? { ...habit, ...updatedHabit } : habit) }))
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to update habit status." })
        }
    },

    deleteHabit: async (habitId) => {
        try {
            await axios.delete(`${apiUrl}/habits/${habitId}`, requestConfig)
            set((state) => ({ habits: state.habits.filter((habit) => habit.id !== habitId) }))
        } catch (error) {
            set({ error: error.response?.data?.message || "Unable to delete habit." })
        }
    },
}))
