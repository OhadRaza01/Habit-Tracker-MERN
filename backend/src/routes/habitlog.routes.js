import { Router } from "express"
import jwtVerify from "../middlewares/auth.middleware.js";
import { createLog, deleteLog, getHabitHistory } from "../controllers/habitlog.controller.js";

const router = Router()

router
    .route("/:habitId")
    .post(jwtVerify, createLog)
    .delete(jwtVerify, deleteLog)
    .get(jwtVerify, getHabitHistory);

export default router