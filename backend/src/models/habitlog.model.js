import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
    {
        habit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit",
            required: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        }
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