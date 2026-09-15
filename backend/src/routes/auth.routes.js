import { Router } from "express";
import { googleAuthCallback } from "../controllers/auth.controller.js";
import passport from "../config/passport.js"
const router = Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
    }),
    googleAuthCallback
);

export default router;