const iconMap = { check: "✓", flame: "♨", target: "◎" }

export default function StatsCard({ icon, label, value, suffix, detail, accent, progress = 0 }) {
    const colors = { orange: "bg-[#fff0ea] text-[#f26b3a]", peach: "bg-[#fff4e8] text-[#ee9b52]", blue: "bg-[#eaf7fb] text-[#50aeca]" }
    return (
        <article className="flex items-center justify-between rounded-2xl border border-[#ece8e2] bg-white px-5 py-5 shadow-[0_4px_18px_rgba(42,31,20,0.025)] sm:px-6">
            <div className="flex items-center gap-4"><span className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${colors[accent]}`}>{iconMap[icon]}</span><div><p className="text-xs text-[#928b83]">{label}</p><p className="mt-1 text-2xl font-bold tracking-[-0.03em]">{value}<span className="text-sm font-normal text-[#928b83]">{suffix}</span></p></div></div>
            {icon === "check" ? <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `conic-gradient(#f26b3a ${progress}%, #fbe2d8 ${progress}% 100%)` }}><div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-[#403a35]">{detail}</div></div> : <span className="self-end text-[11px] font-bold text-[#f26b3a]">{detail}</span>}
        </article>
    )
}