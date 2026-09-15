import { useState } from "react"

export default function HabitManager({ habits, onSelectHabit, onArchive, onDelete }) {
    const [showArchived, setShowArchived] = useState(false)
    const visibleHabits = habits.filter((habit) => habit.isArchived === showArchived)

    return (
        <section>
            <div className="border-b border-[#ece8e2] pb-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a39d95]">Your routine</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">My habits</h1>
                <p className="mt-2 text-sm text-[#89827b]">Keep your active habits close and clear out what you no longer need.</p>
            </div>
            <div className="mt-7 flex gap-2 rounded-xl bg-[#f3eee9] p-1 sm:w-fit">
                <button type="button" onClick={() => setShowArchived(false)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${!showArchived ? "bg-white text-[#ed6334] shadow-sm" : "text-[#837c75]"}`}>Active ({habits.filter((habit) => !habit.isArchived).length})</button>
                <button type="button" onClick={() => setShowArchived(true)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${showArchived ? "bg-white text-[#ed6334] shadow-sm" : "text-[#837c75]"}`}>Archived ({habits.filter((habit) => habit.isArchived).length})</button>
            </div>
            <div className="mt-5 grid gap-3">
                {visibleHabits.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#ded7d0] bg-white px-6 py-12 text-center">
                        <p className="text-lg font-bold">No {showArchived ? "archived" : "active"} habits</p>
                        <p className="mt-2 text-sm text-[#928b83]">{showArchived ? "Archived habits will appear here." : "Add a habit from the top navigation to start building your routine."}</p>
                    </div>
                ) : visibleHabits.map((habit) => (
                    <article key={habit.id} onClick={() => onSelectHabit(habit.id)} className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-[#ece8e2] bg-white p-5 shadow-[0_4px_18px_rgba(42,31,20,0.025)] transition hover:-translate-y-0.5 hover:border-[#f26b3a]/50 sm:flex-row sm:items-center">
                        <div className="min-w-0 flex-1">
                            <h2 className="font-semibold">{habit.name}</h2>
                            <p className="mt-1 text-xs text-[#928b83]">{habit.description || "No description"}</p>
                            <p className="mt-1 text-xs text-[#928b83]">{habit.category || "Uncategorized"} · {habit.frequency} · Target {habit.target}</p>
                            <p className="mt-2 text-xs font-semibold text-[#ed6334]">{habit.completedDays.filter(Boolean).length} check-ins this week</p>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={(event) => { event.stopPropagation(); onArchive(habit.id) }} className="rounded-lg border border-[#e6ded6] px-3 py-2 text-xs font-semibold text-[#756e67] transition hover:border-[#f26b3a] hover:text-[#ed6334]">{habit.isArchived ? "Restore" : "Archive"}</button>
                            <button type="button" onClick={(event) => { event.stopPropagation(); onDelete(habit.id) }} className="rounded-lg border border-[#f3d8cf] px-3 py-2 text-xs font-semibold text-[#c85b3c] transition hover:bg-[#fff0ea]">Delete</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
