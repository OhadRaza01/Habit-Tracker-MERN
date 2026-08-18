import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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


import userRouter from "../src/routes/user.routes.js"
import habitRouter from "../src/routes/habit.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/habits", habitRouter)

export {app}