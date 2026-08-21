import { getDateKey } from "../utils/dateUtil.js";

const calculateHabitStatistics = (habit, logs) => {

    const totalCompletions = logs.length;

    // Convert logs into calendar dates
    const dates = logs
        .map((log) => getDateKey(log.date))
        .sort();

    // Remove duplicate dates
    const uniqueDates = [...new Set(dates)];

    //total days tracked
    const startDateKey = getDateKey(habit.startDate);
    const todayKey = getDateKey(new Date());

    const startDate = new Date(`${startDateKey}T00:00:00`);
    const today = new Date(`${todayKey}T00:00:00`);

    const totalDaysTracked =
        Math.floor(
            (today - startDate) / (1000 * 60 * 60 * 24)
        ) + 1;

    //overall completion rate
    const completionRate =
        totalDaysTracked > 0
            ? Math.round(
                (totalCompletions / totalDaysTracked) * 100
            )
            : 0;


    //streaks (current and best-streak)
    let streak = 0;
    let bestStreak = 0;

    for (let i = 0; i < uniqueDates.length; i++) {

        if (i === 0) {
            streak = 1;
        } else {

            const previousDate =
                new Date(`${uniqueDates[i - 1]}T00:00:00`);

            const currentDate =
                new Date(`${uniqueDates[i]}T00:00:00`);

            const difference =
                (currentDate - previousDate) /
                (1000 * 60 * 60 * 24);

            if (difference === 1) {
                streak++;
            } else {
                streak = 1;
            }
        }

        bestStreak = Math.max(bestStreak, streak);
    }

    let currentStreak = 0;

    if (uniqueDates.length > 0) {

        const latestDate =
            new Date(
                `${uniqueDates[uniqueDates.length - 1]}T00:00:00`
            );

        const todayDate =
            new Date(`${todayKey}T00:00:00`);

        const daysSinceLatest =
            (todayDate - latestDate) /
            (1000 * 60 * 60 * 24);

        if (daysSinceLatest === 0) {
            currentStreak = streak;
        }
    }

    return {
        currentStreak,
        bestStreak,
        totalCompletions,
        completionRate,
        totalDaysTracked,
    };
};


export {
    calculateHabitStatistics
};