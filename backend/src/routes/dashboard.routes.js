import { Router } from "express";
import { getdashboard } from "../controllers/dashboard.controller.js";
import jwtVerify from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", jwtVerify, getdashboard)

export default router