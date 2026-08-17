import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js"
import { User } from "../models/user.model.js"

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

export {registerUser}