import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Social_Network_DB');
        console.log("MongoDB connected successfully");
        return mongoose.connection;
    }catch (error) {
        console.error("MongoDB connection failed", error.message);
        throw new Error("MongoDB connection failed");
    }
}

export default connectDB;