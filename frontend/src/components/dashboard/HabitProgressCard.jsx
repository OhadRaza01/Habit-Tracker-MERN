export default function HabitProgressCard({ habits, todayIndex, onToggle, onSelectHabit, selectedDateLabel }) {
    const completedToday = habits.filter((habit) => habit.completedDays[todayIndex]).length
    return (
        <article className="overflow-hidden rounded-2xl border border-[#ece8e2] bg-white shadow-[0_4px_18px_rgba(42,31,20,0.025)]">
            <div className="flex items-start justify-between px-6 pb-5 pt-6"><div><h2 className="text-lg font-bold">{selectedDateLabel}&apos;s habits</h2><p className="mt-1 text-sm text-[#928b83]">{completedToday} of {habits.length} completed</p></div><button type="button" aria-label="More habit options" className="text-lg font-bold text-[#918a82]">•••</button></div>
            <div className="divide-y divide-[#f1ede8] px-6">
                {habits.map((habit) => { const done = habit.completedDays[todayIndex]; return <div key={habit.id} onClick={() => onSelectHabit(habit.id)} className="flex cursor-pointer items-center gap-3 py-4 transition hover:bg-[#fffaf7]"><button type="button" aria-label={`Mark ${habit.name} ${done ? "incomplete" : "complete"}`} onClick={(event) => { event.stopPropagation(); onToggle(habit.id, todayIndex) }} className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${done ? "bg-[#f26b3a] text-white" : "border-2 border-[#ded8d1] text-transparent hover:border-[#f26b3a]"}`}>✓</button><div className="min-w-0 flex-1"><p className={`truncate text-sm font-bold ${done ? "text-[#8f8880] line-through" : ""}`}>{habit.name}</p><p className="mt-1 text-[11px] text-[#a19a92]">{habit.meta}</p></div><button type="button" aria-label={`More options for ${habit.name}`} onClick={(event) => event.stopPropagation()} className="ml-2 text-lg font-bold text-[#918a82]">•••</button></div> })}
            </div>
        </article>
    )
}