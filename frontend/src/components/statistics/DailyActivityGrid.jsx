const heatmapColors = [
    "bg-[#f3ede4]",
    "bg-[#ffd6b5]",
    "bg-[#ffb07c]",
    "bg-[#ff8755]",
    "bg-[#ff5a36]",
];

export default function DailyActivityGrid({ contributionWeeks }) {
    return (
        <div className="overflow-x-auto">
            <div className="flex gap-1" style={{ minWidth: "620px" }}>
                {contributionWeeks.map((week, weekIndex) => (
                    <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
                        {week.map((day) => (
                            <div
                                key={day.dateKey}
                                className={`h-2.5 w-2.5 rounded-sm border border-[#eee7db] transition-transform hover:scale-110 ${heatmapColors[Math.min(day.value, heatmapColors.length - 1)]}`}
                                title={`${day.label}: ${day.value} habit${day.value === 1 ? "" : "s"} completed`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
