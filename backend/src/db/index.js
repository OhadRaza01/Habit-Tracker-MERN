import mongoose from "mongoose"
import "dotenv/config"
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Db connected : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error while connecting to DataBase.")
        process.exit(1)
    }
}

export default connectDB