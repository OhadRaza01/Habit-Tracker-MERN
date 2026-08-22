import { getDateKey } from "../utils/dateUtil.js";

export const getTodayStats = (habits, logs) => {

    const todayKey = getDateKey(new Date());

    const todayLogs = logs.filter(
        (log) => getDateKey(log.date) === todayKey
    );

    const totalHabits = habits.length;

    const completed = todayLogs.length;

    const remaining = totalHabits - completed;

    const completionRate =
        totalHabits === 0
            ? 0
            : Math.round((completed / totalHabits) * 100);

    return {
        totalHabits,
        completed,
        remaining,
        completionRate,
    };
};

export const getCurrentStreak = (habits, logs) => {
    if (!habits.length) return 0;

    const totalHabits = habits.length;

    const dateCounts = logs.reduce((acc, log) => {

        const dateOnly = log.date.toISOString().split("T")[0];

        acc[dateOnly] = (acc[dateOnly] || 0) + 1;

        return acc
    }, {})

    console.log(dateCounts)

    let streak = 0;

    const dates = Object.keys(dateCounts)
    console.log(dates)

    for (let i = 0; i < dates.length; i++) {

        if (dateCounts[dates[i]] == totalHabits && i !== dates.length - 1) {
            streak++
        }
        else if (i === dates.length - 1 && dateCounts[dates[i]] == totalHabits) {
            streak++
        }
        else if (i === dates.length - 1 && dateCounts[dates[i]] != totalHabits) {
            streak = streak
        }
        else {
            streak = 0
        }

    }

    return streak
}