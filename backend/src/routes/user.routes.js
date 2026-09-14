import { Router } from "express";
import { forgotPassword, getCurrentUser, loginUser, logoutUser, registerUser, resetForgottenPassword, resetPassword } from "../controllers/user.controller.js";
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

router.route("/forgot-password").post(
    forgotPassword
)

router.route("/reset-forgotten-password").post(
    resetForgottenPassword
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

router.route("/reset-password/:token").post(
    jwtVerify,
    resetPassword
)


export default router