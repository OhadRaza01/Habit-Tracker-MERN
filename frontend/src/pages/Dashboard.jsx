import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useHabitStore } from "../stores/habitStore"
import { getDateKey, getWeekDateKeys } from "../utils/dateUtil"
import DashboardSidebar from "../components/dashboard/DashboardSidebar"
import DashboardTopbar from "../components/dashboard/DashboardTopbar"
import HabitProgressCard from "../components/dashboard/HabitProgressCard"
import HabitManager from "../components/dashboard/HabitManager"
import AddHabitModal from "../components/dashboard/AddHabitModal"
import StatsCard from "../components/dashboard/StatsCard"
import WeeklyProgress from "../components/dashboard/WeeklyProgress"
import HabitDetail from "../components/dashboard/HabitDetail"
import ChangePasswordModal from "../components/dashboard/ChangePasswordModal"
import LoadingScreen from "../components/shared/LoadingScreen"
import PopUp from "../components/shared/PopUp"

export default function Dashboard() {
    const { user, logout, loading: authLoading } = useAuth()
    const navigate = useNavigate()
    const habits = useHabitStore((state) => state.habits)
    const loading = useHabitStore((state) => state.loading)
    const error = useHabitStore((state) => state.error)
    const fetchHabits = useHabitStore((state) => state.fetchHabits)
    const toggleHabit = useHabitStore((state) => state.toggleHabit)
    const addHabitToStore = useHabitStore((state) => state.addHabit)
    const updateHabit = useHabitStore((state) => state.updateHabit)
    const setArchived = useHabitStore((state) => state.setArchived)
    const deleteHabit = useHabitStore((state) => state.deleteHabit)
    const fetchHabitStats = useHabitStore((state) => state.fetchHabitStats)
    const habitStats = useHabitStore((state) => state.habitStats)
    const [activeSection, setActiveSection] = useState("overview")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [editingHabit, setEditingHabit] = useState(null)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [selectedHabitId, setSelectedHabitId] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isLogoutPromptOpen, setIsLogoutPromptOpen] = useState(false)
    const [selectedDayIndex, setSelectedDayIndex] = useState(null)

    useEffect(() => {
        document.title = "Dashboard | Habitly"

        return () => {
            document.title = "Habitly - Build Better Habits"
        }
    }, [])

    useEffect(() => {
        if (!authLoading && user) fetchHabits()
    }, [authLoading, user, fetchHabits])

    if (authLoading) return <LoadingScreen />
    if (!user) return <Navigate to="/login" replace />

    const activeHabits = habits.filter((habit) => !habit.isArchived)
    const dateKeys = getWeekDateKeys()
    const selectedHabit = habits.find((habit) => habit.id === selectedHabitId)
    const todayIndex = dateKeys.indexOf(getDateKey(new Date()))
    const activeDayIndex = selectedDayIndex ?? todayIndex
    const selectedDateKey = dateKeys[activeDayIndex]
    const selectedDate = new Date(`${selectedDateKey}T12:00:00Z`)
    const selectedDateLabel = activeDayIndex === todayIndex
        ? "Today"
        : new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", month: "short", day: "numeric" }).format(selectedDate)
    const completedOnSelectedDay = activeHabits.filter((habit) => habit.completedDays[activeDayIndex]).length
    const totalCheckIns = activeHabits.reduce((total, habit) => total + habit.totalCompletions, 0)
    const weeklyCompletedCounts = activeHabits.length > 0
        ? activeHabits[0].completedDays.map((_, dayIndex) => activeHabits.filter((habit) => habit.completedDays[dayIndex]).length)
        : [0, 0, 0, 0, 0, 0, 0]
    const weeklyProgress = activeHabits.length > 0
        ? weeklyCompletedCounts.map((completedCount) => Math.round((completedCount / activeHabits.length) * 100))
        : [0, 0, 0, 0, 0, 0, 0]
    const averageCompletion = Math.round(weeklyProgress.reduce((total, value) => total + value, 0) / weeklyProgress.length)
    const currentStreak = weeklyProgress.slice(0, activeDayIndex + 1).reverse().findIndex((completion) => completion < 100)
    const streakDays = currentStreak === -1 ? activeDayIndex + 1 : currentStreak
    const bestDayIndex = weeklyProgress.indexOf(Math.max(...weeklyProgress))

    const selectHabit = (habitId) => {
        setSelectedHabitId(habitId)
        setActiveSection("habit-detail")
        fetchHabitStats(habitId)
    }

    const saveHabit = async (habitData) => {
        const saved = editingHabit ? await updateHabit(editingHabit.id, habitData) : await addHabitToStore(habitData)
        if (saved) {
            setIsAddModalOpen(false)
            setEditingHabit(null)
            if (!editingHabit) setActiveSection("my-habits")
        }
    }

    const editHabit = (habit) => {
        setEditingHabit(habit)
        setIsAddModalOpen(true)
    }

    const handleLogout = async () => {
        setIsLogoutPromptOpen(false)
        await logout()
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-[#fbfaf8] text-[#252321]">
            <DashboardSidebar
                user={user}
                activeSection={activeSection}
                onNavigate={(section) => {
                    setActiveSection(section)
                    setIsSidebarOpen(false)
                }}
                onLogout={() => setIsLogoutPromptOpen(true)}
                onSettings={() => {
                    setIsPasswordModalOpen(true)
                    setIsSidebarOpen(false)
                }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="min-h-screen lg:ml-64">
                <DashboardTopbar onAddHabit={() => setIsAddModalOpen(true)} onMenuClick={() => setIsSidebarOpen((open) => !open)} />
                <div className="mx-auto max-w-360 px-5 pb-10 pt-7 sm:px-8 lg:px-10">
                    {loading ? <div className="flex min-h-[50vh] items-center justify-center"><p className="text-sm font-semibold text-[#928b83]">Loading your habits...</p></div> : error && habits.length === 0 ? <div className="rounded-2xl border border-[#f3d8cf] bg-white px-6 py-10 text-center"><p className="text-lg font-bold">We couldn&apos;t load your habits</p><p className="mt-2 text-sm text-[#c85b3c]">{error}</p></div> : activeSection === "overview" ? <>
                        <section className="flex flex-col justify-between gap-5 border-b border-[#ece8e2] pb-7 md:flex-row md:items-end">
                            <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a39d95]">{new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", weekday: "long", month: "long", day: "numeric" }).format(selectedDate)}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#282522] sm:text-4xl">{user?.username || user?.fullName || "there"}, own {selectedDateLabel.toLowerCase()} <span className="text-[#f26b3a]">✦</span></h1><p className="mt-2 text-sm text-[#89827b]">{activeHabits.length ? `You have ${completedOnSelectedDay} of ${activeHabits.length} habits complete on ${selectedDateLabel.toLowerCase()}.` : "Start building your routine today."}</p></div>
                            <div className="flex w-fit items-center gap-5 rounded-xl border border-[#e9e3dc] bg-white px-3 py-2 text-sm font-semibold shadow-sm"><button type="button" aria-label="Show previous day" onClick={() => setSelectedDayIndex(Math.max(0, activeDayIndex - 1))} disabled={activeDayIndex === 0} className="text-[#9c958d] disabled:cursor-not-allowed disabled:opacity-40">‹</button><button type="button" onClick={() => setSelectedDayIndex(null)} className="min-w-12">{selectedDateLabel}</button><button type="button" aria-label="Show next day" onClick={() => setSelectedDayIndex(Math.min(todayIndex, activeDayIndex + 1))} disabled={activeDayIndex >= todayIndex} className="text-[#9c958d] disabled:cursor-not-allowed disabled:opacity-40">›</button></div>
                        </section>
                        <section className="mt-7 grid gap-4 md:grid-cols-3"><StatsCard icon="check" label={`Completed ${selectedDateLabel.toLowerCase()}`} value={completedOnSelectedDay} suffix={`/ ${activeHabits.length}`} progress={activeHabits.length ? Math.round((completedOnSelectedDay / activeHabits.length) * 100) : 0} detail={`${activeHabits.length ? Math.round((completedOnSelectedDay / activeHabits.length) * 100) : 0}%`} accent="orange" /><StatsCard icon="flame" label="Current streak" value={streakDays} suffix=" days" detail={`${completedOnSelectedDay} ${selectedDateLabel.toLowerCase()}`} accent="peach" /><StatsCard icon="target" label="Total check-ins" value={totalCheckIns} suffix=" times" detail={`${weeklyProgress[bestDayIndex]}% best day`} accent="blue" /></section>
                        <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]"><HabitProgressCard habits={activeHabits} todayIndex={activeDayIndex} onToggle={toggleHabit} onSelectHabit={selectHabit} selectedDateLabel={selectedDateLabel} /><WeeklyProgress points={weeklyProgress} completedCounts={weeklyCompletedCounts} dates={dateKeys} averageCompletion={averageCompletion} /></section>
                    </> : activeSection === "my-habits" ? <HabitManager habits={habits} onSelectHabit={selectHabit} onArchive={setArchived} onDelete={deleteHabit} /> : <HabitDetail habit={selectedHabit} stats={selectedHabitId ? habitStats[selectedHabitId] : null} loading={!selectedHabitId || !habitStats[selectedHabitId]} onEdit={editHabit} onBack={() => setActiveSection("my-habits")} />}
                </div>
            </main>
            {isAddModalOpen && <AddHabitModal habit={editingHabit} onClose={() => { setIsAddModalOpen(false); setEditingHabit(null) }} onSubmit={saveHabit} />}
            {isPasswordModalOpen && <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />}
            <PopUp
                isOpen={isLogoutPromptOpen}
                onClose={() => setIsLogoutPromptOpen(false)}
                title="Log out?"
                message="Are you sure you want to log out of Habitly?"
                buttonText="Log out"
                cancelButtonText="Cancel"
                onButtonClick={handleLogout}
                icon={<span className="text-xl text-[#ff5a36]">↗</span>}
            />
        </div>
    )
}
