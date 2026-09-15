const formatDate = (dateKey) => {
    const [year, month, day] = dateKey.split("-").map(Number)
    return new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", weekday: "short", day: "numeric" }).format(new Date(Date.UTC(year, month - 1, day, 12)))
}

export default function WeeklyProgress({ points, dates, averageCompletion }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-[#ece8e2] bg-white shadow-[0_4px_18px_rgba(42,31,20,0.025)]">
            <div className="flex items-start justify-between px-6 pb-2 pt-6">
                <div><h2 className="text-lg font-bold">Weekly progress</h2><p className="mt-1 text-sm text-[#928b83]">Your consistency, day by day</p></div>
                <button type="button" aria-label="More progress options" className="text-lg font-bold text-[#918a82]">•••</button>
            </div>
            <div className="px-6 pt-8">
                <div className="relative flex h-44 items-end justify-between gap-2 border-b border-dashed border-[#e8e1da] pb-0">
                    {points.map((point, index) => <div key={`${dates[index]}-${point}`} className="group relative flex h-full flex-1 items-end justify-center"><div className="absolute bottom-0 h-full w-px border-l border-dashed border-[#f1ede8]" /><div className="relative z-10 w-3 rounded-full border-[3px] border-white bg-[#f26b3a] shadow-[0_0_0_2px_#f26b3a] transition group-hover:scale-125" style={{ height: `${point}%` }} /></div>)}
                </div>
                <div className="flex justify-between gap-2 py-3 text-[11px] text-[#9e978f]">{dates.map((date) => <span key={date}>{formatDate(date)}</span>)}</div>
            </div>
            <div className="flex items-center gap-3 border-t border-[#f1ede8] px-6 py-5"><span className="text-xl font-bold">{averageCompletion}%</span><span className="text-xs text-[#9e978f]">Average completion</span><span className="ml-auto text-[11px] font-bold text-[#58ae8e]">Live from habits</span></div>
        </article>
    )
}
