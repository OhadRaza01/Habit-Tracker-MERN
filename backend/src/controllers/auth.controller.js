import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000
};

export const googleAuthCallback = asyncHandler(async (req, res) => {
    try {
        const user = req.user; // set by passport's verify callback

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        res
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .redirect(`${process.env.FRONTEND_URL}/oauth-success`);

    } catch (err) {
        console.error("Google auth callback error:", err);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
    }
});