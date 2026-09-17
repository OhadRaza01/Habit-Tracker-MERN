import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HabitLog } from "../models/habitlog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Habit } from "../models/habit.model.js";
import { calculateHabitStatistics } from "../services/habitstats.service.js";
import { getDateForKey, getDateKey, getDateRangeForKey, getLocalISOString, isDateKey } from "../utils/dateUtil.js";

const createLog = asyncHandler(async (req, res) => {

    const { habitId } = req.params;
    const currentISOString = getLocalISOString();
    const dateKey = req.body?.date || getDateKey(currentISOString);

    if (!isDateKey(dateKey)) {
        throw new ApiError(400, "Invalid habit log date.");
    }

    const logDate = getDateForKey(dateKey);

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.")
    }

    const habit = await Habit.findOne({
        _id: habitId,
        owner: req.user._id
    });

    if (!habit) {
        throw new ApiError(404, "Habit not found.");
    }

    const existedLog = await HabitLog.findOne({
        habit: habitId,
        owner: req.user._id,
        date: getDateRangeForKey(dateKey)
    })

    if (existedLog) {
        throw new ApiError(
            409,
            "Habit is already completed on that date."
        );
    }

    const log = await HabitLog.create({
        habit: habitId,
        owner: req.user._id,
        date: logDate
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                log,
                "Habit completed successfully."
            )
        );
})

const deleteLog = asyncHandler(async (req, res) => {

    const { habitId } = req.params;
    const currentISOString = getLocalISOString();
    const dateKey = req.body?.date || getDateKey(currentISOString);

    if (!isDateKey(dateKey)) {
        throw new ApiError(400, "Invalid habit log date.");
    }

    const logDate = getDateForKey(dateKey);

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.")
    }

    const habit = await Habit.findOne({
        _id: habitId,
        owner: req.user._id
    });

    if (!habit) {
        throw new ApiError(404, "Habit not found.");
    }

    const log = await HabitLog.findOneAndDelete({
        habit: habitId,
        owner: req.user._id,
        date: getDateRangeForKey(dateKey)
    })

    if (!log) {
        throw new ApiError(404, "Habit log not found.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Habit completion removed successfully."
            )
        );
})

const getHabitHistory = asyncHandler(async (req, res) => {

    const { habitId } = req.params

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.")
    }

    const habit = await Habit.findOne({
        _id: habitId,
        owner: req.user._id
    });

    if (!habit) {
        throw new ApiError(404, "Habit not found.");
    }

    const habitHistory = await HabitLog.find({
        habit: habitId,
        owner: req.user._id
    }).sort({ date: 1 })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                habitHistory,
                "habit history is fetched successfully."
            )
        )
})

const getHabitStatistics = asyncHandler(async (req, res) => {

    const { habitId } = req.params;

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.");
    }

    const habit = await Habit.findOne({
        _id: habitId,
        owner: req.user._id,
    });

    if (!habit) {
        throw new ApiError(404, "Habit not found.");
    }

    const logs = await HabitLog.find({
        habit: habitId,
        owner: req.user._id,
    }).sort({
        date: 1,
    });

    const statistics = calculateHabitStatistics(
        habit,
        logs
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                statistics,
                "Habit statistics fetched successfully."
            )
        );
});

export { createLog, deleteLog, getHabitHistory, getHabitStatistics }