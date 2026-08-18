import { Router } from "express"
import jwtVerify from "../middlewares/auth.middleware.js"
import { createHabit } from "../controllers/habit.controller.js"

const router = Router()

router.route("/create-habit").post(
    jwtVerify, createHabit
)

export default router