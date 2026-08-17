import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import 'dotenv/config'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET 
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "image"
        })
        //file uplaoded successfully
        fs.unlinkSync(filePath) 
        
        return response
    }
    catch (error) {
        fs.unlinkSync(filePath) // remove temporary save file from server as uploaded failed
        return null;
    }
}

export {uploadOnCloudinary}