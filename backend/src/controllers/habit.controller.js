import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Habit } from "../models/habit.model.js";

const createHabit = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        category,
        frequency,
        target,
        reminderTime
    } = req.body;

    if (!name) {
        throw new ApiError(400, "Habit name is required.");
    }

    const habit = await Habit.create({
        name,
        description,
        category,
        frequency,
        target,
        reminderTime,
        owner: req.user._id
    });

    if (!habit) {
        throw new ApiError(
            500,
            "Error while creating habit."
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                habit,
                "Habit created successfully."
            )
        );
});

const getUserActiveHabits = asyncHandler(async (req, res) => {

    const habits = await Habit.find({
        owner: req.user._id,
        isArchived: false
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                habits,
                "User active habits fetched successfully."
            )
        );
});

const getUserArchiveHabits = asyncHandler(async (req, res) => {

    const habits = await Habit.find({
        owner: req.user._id,
        isArchived: true
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                habits,
                "User archived habits fetched successfully."
            )
        );
});

export { createHabit, getUserActiveHabits, getUserArchiveHabits }