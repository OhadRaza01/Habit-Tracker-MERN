import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser, resetPassword } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import jwtVerify from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)

router.route("/login").post(
    loginUser
)

//protected routes

router.route("/logout").post(
    jwtVerify,
    logoutUser
)

router.route("/me").get(
    jwtVerify,
    getCurrentUser
)

router.route("/reset-password").post(
    jwtVerify,
    resetPassword
)


export default router