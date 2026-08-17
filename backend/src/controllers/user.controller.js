import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js"
import { User } from "../models/user.model.js"

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

export { registerUser, loginUser, logoutUser, getCurrentUser }