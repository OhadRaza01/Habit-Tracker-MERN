export default function HabitDetail({ habit, stats, loading, onBack, onEdit }) {
    if (!habit) return null

    const statisticCards = [
        { label: "Completion rate", value: stats ? `${stats.completionRate}%` : "-" },
        { label: "Current streak", value: stats ? `${stats.currentStreak} days` : "-" },
        { label: "Best streak", value: stats ? `${stats.bestStreak} days` : "-" },
        { label: "Total completions", value: stats ? stats.totalCompletions : "-" },
    ]

    return (
        <section>
            <button type="button" onClick={onBack} className="mb-6 text-sm font-semibold text-[#ed6334] hover:underline">← Back to habits</button>
            <div className="flex flex-col gap-5 border-b border-[#ece8e2] pb-7 sm:flex-row sm:items-center"><span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${habit.color}`}>{habit.icon}</span><div className="flex-1"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a39d95]">Habit statistics</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{habit.name}</h1><p className="mt-2 text-sm text-[#89827b]">{habit.description || "No description"}</p></div><button type="button" onClick={() => onEdit(habit)} className="rounded-lg border border-[#e6ded6] px-4 py-2 text-sm font-semibold text-[#756e67] hover:border-[#f26b3a] hover:text-[#ed6334]">Edit habit</button></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{statisticCards.map((card) => <article key={card.label} className="rounded-2xl border border-[#ece8e2] bg-white p-5"><p className="text-xs text-[#928b83]">{card.label}</p><p className="mt-2 text-2xl font-bold">{loading ? "..." : card.value}</p></article>)}</div>
            <div className="mt-6 rounded-2xl border border-[#ece8e2] bg-white p-6"><h2 className="text-lg font-bold">Habit details</h2><div className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><p><span className="text-[#928b83]">Category</span><br /><strong>{habit.category || "General"}</strong></p><p><span className="text-[#928b83]">Frequency</span><br /><strong className="capitalize">{habit.frequency}</strong></p><p><span className="text-[#928b83]">Target</span><br /><strong>{habit.target}</strong></p><p><span className="text-[#928b83]">Start date</span><br /><strong>{new Date(habit.startDate).toLocaleDateString()}</strong></p><p><span className="text-[#928b83]">Days tracked</span><br /><strong>{stats?.totalDaysTracked ?? "-"}</strong></p></div></div>
        </section>
    )
}
