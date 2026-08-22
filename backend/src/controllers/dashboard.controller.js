import asyncHandler from "../utils/asyncHandler.js"
import { Habit } from "../models/habit.model.js"
import { HabitLog } from "../models/habitlog.model.js"
import { getTodayStats } from "../services/dashboard.service.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const getdashboard = asyncHandler(async (req, res) => {

    const habits = await Habit.find({
        owner: req.user._id,
        isArchived: false
    })

    const logs = await HabitLog.find({
        owner: req.user.id
    })

    const todayStats = getTodayStats(habits, logs)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                todayStats,
                "dashboard details fetched successfully"
            )
        )
})

export {getdashboard}