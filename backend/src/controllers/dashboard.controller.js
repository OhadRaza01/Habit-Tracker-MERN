import asyncHandler from "../utils/asyncHandler.js"
import { Habit } from "../models/habit.model.js"
import { HabitLog } from "../models/habitlog.model.js"
import { getTodayStats, getCurrentStreak } from "../services/dashboard.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const getdashboard = asyncHandler(async (req, res) => {

    const habits = await Habit.find({
        owner: req.user._id,
        isArchived: false
    })

    const logs = await HabitLog.find({
        owner: req.user.id
    }).sort({ date: 1 })

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build a Set of habit IDs that have a log dated today, using the
    // logs we already fetched — no extra DB query needed.
    const completedTodayHabitIds = new Set(
        logs
            .filter((log) => {
                const logDate = new Date(log.date);
                logDate.setHours(0, 0, 0, 0);
                return logDate.getTime() === today.getTime();
            })
            .map((log) => log.habit.toString())
    );

    // Attach `completed` onto each habit before sending it to the client.
    // .toObject() so we're spreading a plain object, not a Mongoose document.
    const habitsWithCompletion = habits.map((habit) => ({
        ...habit.toObject(),
        completed: completedTodayHabitIds.has(habit._id.toString())
    }));

    const todayStats = getTodayStats(habits, logs)
    const currentStreak = getCurrentStreak(habits, logs)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    habits: habitsWithCompletion,
                    statistics: {
                        ...todayStats,
                        currentStreak
                    }
                },
                "dashboard details fetched successfully"
            )
        )
})

export { getdashboard }