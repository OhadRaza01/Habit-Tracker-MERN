function StatIcon({ type }) {
    const commonProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-5 w-5",
        "aria-hidden": true,
    }

    switch (type) {
        case "check":
            return (
                <svg {...commonProps}>
                    <path d="M5 12.5 9.4 17l9.6-10" />
                </svg>
            )
        case "flame":
            return (
                <svg {...commonProps}>
                    <path d="M12 3.5c1.8 2.1 3.2 3.7 3.2 6.1A3.2 3.2 0 0 1 12 13c-1.8 0-3.2-1.4-3.2-3.2 0-1.1.5-2.3 1.6-3.3.4-.4 1-.9 1.6-1.5Z" />
                    <path d="M12 13.5c2.1 0 3.8 1.7 3.8 3.8A3.8 3.8 0 0 1 12 21a3.8 3.8 0 0 1-3.8-3.7c0-2.1 1.7-3.8 3.8-3.8Z" />
                </svg>
            )
        case "target":
            return (
                <svg {...commonProps}>
                    <circle cx="12" cy="12" r="7.5" />
                    <circle cx="12" cy="12" r="3.5" />
                    <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
                </svg>
            )
        default:
            return null
    }
}

export default function StatsCard({ icon, label, value, suffix, detail, accent, progress = 0 }) {
    const colors = { orange: "bg-[#fff0ea] text-[#f26b3a]", peach: "bg-[#fff4e8] text-[#ee9b52]", blue: "bg-[#eaf7fb] text-[#50aeca]" }
    return (
        <article className="flex items-center justify-between rounded-2xl border border-[#ece8e2] bg-white px-5 py-5 shadow-[0_4px_18px_rgba(42,31,20,0.025)] sm:px-6">
            <div className="flex items-center gap-4"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[accent]}`}><StatIcon type={icon} /></span><div><p className="text-xs text-[#928b83]">{label}</p><p className="mt-1 text-2xl font-bold tracking-[-0.03em]">{value}<span className="text-sm font-normal text-[#928b83]">{suffix}</span></p></div></div>
            {icon === "check" ? <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `conic-gradient(#f26b3a ${progress}%, #fbe2d8 ${progress}% 100%)` }}><div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-[#403a35]">{detail}</div></div> : <span className="self-end text-[11px] font-bold text-[#f26b3a]">{detail}</span>}
        </article>
    )
}