import mongoose from "mongoose";
import dotenv from "dotenv";


// Load environment variables from .env file
dotenv.config();


export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
