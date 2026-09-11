export default function WeeklyActivityChart({ weeklyData, maxWeeklyValue }) {
    return (
        <div className="rounded-2xl border border-[#eee7db] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#14151a]">Weekly activity</h2>
                <span className="text-xs font-medium text-[#8a8a8a]">
                    {weeklyData.reduce((sum, item) => sum + item.value, 0)} completions this week
                </span>
            </div>

            <div className="mt-5 flex h-44 items-end gap-3">
                {weeklyData.map((day) => (
                    <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-[11px] font-semibold text-[#14151a]">
                            {day.value}
                        </span>
                        <div className="flex h-28 w-full items-end justify-center">
                            <div
                                className={`w-full rounded-t-xl transition-all ${day.value === 0
                                    ? "bg-[#f3ede4]"
                                    : day.value === 1
                                        ? "bg-[#ffd6b5]"
                                        : day.value === 2
                                            ? "bg-[#ffb07c]"
                                            : day.value === 3
                                                ? "bg-[#ff8755]"
                                                : "bg-[#ff5a36]"
                                    }`}
                                style={{ height: `${Math.max((day.value / maxWeeklyValue) * 100, day.value === 0 ? 8 : 16)}%` }}
                                title={`${day.value} habit${day.value === 1 ? "" : "s"} completed on ${day.label}`}
                            />
                        </div>
                        <span className="text-[10px] font-medium text-[#8a8a8a]">{day.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
