import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
