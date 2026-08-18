import { Router } from "express"
import jwtVerify from "../middlewares/auth.middleware.js"
import { createHabit, deleteHabit, getUserActiveHabits, getUserArchiveHabits } from "../controllers/habit.controller.js"

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
    jwtVerify , deleteHabit
)

export default router