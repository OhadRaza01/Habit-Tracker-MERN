import { Router } from "express"
import jwtVerify from "../middlewares/auth.middleware.js"
import { createHabit, deleteHabit, getUserActiveHabits, getUserArchiveHabits, toggleArchive, updateHabit } from "../controllers/habit.controller.js"

const router = Router()

router.route("/create-habit").post(
    jwtVerify, createHabit
)

router.route("/").get(
    jwtVerify, getUserActiveHabits
)

router.route("/archived").get(
    jwtVerify, getUserArchiveHabits
)

router.route("/:habitId").delete(
    jwtVerify, deleteHabit
)

router.route("/:habitId/toggle-status").patch(
    jwtVerify, toggleArchive
)

router.patch(
    "/:habitId",
    jwtVerify,
    updateHabit
)

export default router