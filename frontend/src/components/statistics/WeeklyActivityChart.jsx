export default function WeeklyActivityChart({ weeklyData, maxWeeklyValue }) {
    return (
        <div className="rounded-2xl border border-[#eee7db] bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-bold text-[#14151a] sm:text-lg">Weekly activity</h2>
                <span className="text-[10px] font-medium text-[#8a8a8a] sm:text-xs">
                    {weeklyData.reduce((sum, item) => sum + item.value, 0)} completions this week
                </span>
            </div>

            <div className="mt-4 flex h-32 items-end gap-2 sm:h-40 sm:gap-3 md:h-44">
                {weeklyData.map((day) => (
                    <div key={day.label} className="flex flex-1 flex-col items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-semibold text-[#14151a] sm:text-[11px]">
                            {day.value}
                        </span>
                        <div className="flex h-20 w-full items-end justify-center sm:h-24 md:h-28">
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
                        <span className="text-[9px] font-medium text-[#8a8a8a] sm:text-[10px]">{day.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
