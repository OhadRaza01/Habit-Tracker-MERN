import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Habit } from "../models/habit.model.js";
import mongoose from "mongoose";

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

const deleteHabit = asyncHandler(async (req, res) => {

    const { habitId } = req.params

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.")
    }

    const habit = await Habit.findOneAndDelete({
        owner: req.user._id,
        _id: habitId
    })

    if (!habit) {
        throw new ApiError(404, "habit not found.")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Habit is deleted Successfully"
            )
        )
})

const toggleArchive = asyncHandler(async (req, res) => {

    const { habitId } = req.params

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.")
    }

    const habit = await Habit.findOne(
        {
            _id: habitId,
            owner: req.user._id
        }
    )

    if (!habit) {
        throw new ApiError(404, "Habit not found.")
    }

    habit.isArchived = !habit.isArchived
    await habit.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                habit,
                "Archived button is toggled."
            )
        )

})

const updateHabit = asyncHandler(async (req, res) => {
    const { habitId } = req.params

    if (!mongoose.isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid habit id.")
    }

    const allowedFields = [
        "name",
        "description",
        "category",
        "frequency",
        "target",
        "reminderTime",
        "startDate",
    ]

    const updates = {}

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field]
        }
    }

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No valid fields provided for update.")
    }

    const habit = await Habit.findOneAndUpdate(
        {
            _id: habitId,
            owner: req.user._id,
        },
        {
            $set: updates,
        },
        {
            returnDocument:"after",
            runValidators: true,
        }
    )

    if (!habit) {
        throw new ApiError(404, "Habit not found.")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                habit,
                "Habit updated successfully."
            )
        )
})

export { createHabit, getUserActiveHabits, getUserArchiveHabits, deleteHabit, toggleArchive, updateHabit }