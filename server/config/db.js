import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connect successfully")
    } catch (error) {
        console.log("error while connect DB")
    }
}

export default connectDB;