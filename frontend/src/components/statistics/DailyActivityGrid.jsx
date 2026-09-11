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
            <div className="flex gap-0.5 sm:gap-1" style={{ minWidth: "320px" }}>
                {contributionWeeks.map((week, weekIndex) => (
                    <div key={`week-${weekIndex}`} className="flex flex-col gap-0.5 sm:gap-1">
                        {week.map((day) => (
                            <div
                                key={day.dateKey}
                                className={`h-1.5 w-1.5 rounded-sm border border-[#eee7db] transition-transform hover:scale-110 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 ${heatmapColors[Math.min(day.value, heatmapColors.length - 1)]}`}
                                title={`${day.label}: ${day.value} habit${day.value === 1 ? "" : "s"} completed`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
