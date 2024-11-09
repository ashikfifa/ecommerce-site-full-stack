import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("Please provide MONGO");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is successfully connected");
  } catch (error) {
    console.log("MongoDB connct error", error);
  }
}

export default connectDB;
