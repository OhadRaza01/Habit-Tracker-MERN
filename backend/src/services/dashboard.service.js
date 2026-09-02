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
        return acc;
    }, {});

    const cursor = new Date();
    const todayKey = getDateKey(cursor);

    if (dateCounts[todayKey] !== totalHabits) {
        cursor.setDate(cursor.getDate() - 1);
    }

    let streak = 0;

    while (true) {
        const key = getDateKey(cursor);

        if (dateCounts[key] !== totalHabits) {
            break;
        }

        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
};

export { getTodayStats, getCurrentStreak }