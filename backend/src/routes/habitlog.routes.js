import { Router } from "express"
import jwtVerify from "../middlewares/auth.middleware.js";
import { createLog, deleteLog, getHabitHistory, getHabitStatistics } from "../controllers/habitlog.controller.js";

const router = Router()

router
    .route("/:habitId")
    .post(jwtVerify, createLog)
    .delete(jwtVerify, deleteLog)
    .get(jwtVerify, getHabitHistory);

router.route("/:habitId/habit-stats").get(
    jwtVerify, getHabitStatistics
)

export default router