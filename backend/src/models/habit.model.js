import mongoose from "mongoose"

const habitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        category: {
            type: String,
            trim: true,
        },

        frequency: {
            type: String,
            enum: ["daily", "weekly"],
            default: "daily",
        },

        target: {
            type: Number,
            default: 1,
        },

        reminderTime: {
            type: String,
        },

        startDate: {
            type: Date,
            default: Date.now,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Habit = mongoose.model("Habit", habitSchema)