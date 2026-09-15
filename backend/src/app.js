import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import passport from "passport"

const app = express()

//configureing app
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(passport.initialize())

import userRouter from "../src/routes/user.routes.js"
import habitRouter from "../src/routes/habit.routes.js"
import habitlogRouter from "../src/routes/habitlog.routes.js"
import dashboardRouter from "../src/routes/dashboard.routes.js"
import authRouter from "../src/routes/auth.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/habits", habitRouter)
app.use("/api/v1/habit-logs" , habitlogRouter)
app.use("/api/v1/dashboard",dashboardRouter)
app.use("/api/v1/auth",authRouter)

export default app