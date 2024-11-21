import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/parrotpedia");
        console.log("Database connected");
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
    }
}