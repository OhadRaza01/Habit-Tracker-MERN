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