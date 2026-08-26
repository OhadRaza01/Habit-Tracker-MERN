import { getDateKey } from "../utils/dateUtil.js";

const getTodayStats = (habits, logs) => {

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

const getCurrentStreak = (habits, logs) => {
    if (!habits.length) return 0;

    const totalHabits = habits.length;

    const dateCounts = logs.reduce((acc, log) => {

        const dateOnly = getDateKey(log.date);

        acc[dateOnly] = (acc[dateOnly] || 0) + 1;

        return acc
    }, {})

    let streak = 0;

    const dates = Object.keys(dateCounts).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    for (let i = dates.length - 1; i >= 0; i--) {

        if (dateCounts[dates[i]] !== totalHabits) {
            break;
        }

        if (i < dates.length - 1) {
            const currentDate = new Date(dates[i]);
            const nextDate = new Date(dates[i + 1]);

            const difference =
                (nextDate - currentDate) / (1000 * 60 * 60 * 24);

            if (difference !== 1) {
                break;
            }
        }

        streak++;
    }

    return streak
}

export{getTodayStats, getCurrentStreak}