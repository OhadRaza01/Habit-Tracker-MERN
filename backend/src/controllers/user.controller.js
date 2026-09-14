import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js"
import { User } from "../models/user.model.js"
import { sendPasswordResetEmail } from "../utils/sendEmail.js";

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshToken = async (userId) => {

    try {

        const user = await User.findById(userId)

        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken

        user.save({ validateBeforeSave: false })

        return {
            refreshToken,
            accessToken
        }
    }
    catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, username, email, password } = req.body

    if (!fullName || !username || !email || !password) {
        throw new ApiError(400, "All fields are required.")
    }

    const userExisted = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExisted) {
        throw new ApiError(409, "username or email is already registered.")
    }

    let avatarLocalPath;
    if (req.file?.path) {
        avatarLocalPath = req.file.path
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const user = await User.create({
        fullName,
        username,
        email,
        password,
        avatar: avatar?.url || "",
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Error while registering user.")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User is registered successfully.")
        )

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required.")
    }

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        throw new ApiError(400, "User not found.")
    }

    if (user.provider === "google") {
        throw new ApiError(
            400,
            "This account was created using Google Sign-In. Please continue with Google."
        )
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "invalid user credentials")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "user logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findOneAndUpdate({
        _id: req.user._id
    },
        {
            $unset: {
                refreshToken: 1
            }
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "user logged out successfully."
            )
        )

})

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = req.user

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "current user is fetched successfully."
            )
        )
})

const resetPassword = asyncHandler(async (req, res) => {

    const { newPassword, confirmPassword } = req.body

    if (!newPassword || !confirmPassword) {
        throw new ApiError(400, "New password and confirm password are required.")
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match.")
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found.")
    }

    user.password = newPassword
    await user.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password reset successfully."
            )
        )
})

const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required.")
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "If that email is registered, a reset link has been sent."
                )
            )
    }

    // 1. Raw token generate karo (ye email mein jayega)
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex")

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    await user.save({ validateBeforeSave: false })

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`

    await sendPasswordResetEmail(user.email, resetLink)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "If that email is registered, a reset link has been sent."
            )
        )
})

const resetForgottenPassword = asyncHandler(async (req, res) => {

    const { token } = req.params
    const { newPassword, confirmPassword } = req.body

    if (!newPassword || !confirmPassword) {
        throw new ApiError(400, "New password and confirm password are required.")
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match.")
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
        throw new ApiError(400, "Reset link is invalid or has expired. Please request a new one.")
    }

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password reset successfully. You can now log in."
            )
        )
})

export { registerUser, loginUser, logoutUser, getCurrentUser, resetPassword, forgotPassword,
    resetForgottenPassword
 }