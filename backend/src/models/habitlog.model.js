import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
    {
        habit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

habitLogSchema.index(
    { habit: 1, date: 1 },
    { unique: true }
);

export const HabitLog = mongoose.model("HabitLog", habitLogSchema);