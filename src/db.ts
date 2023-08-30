import mongoose from "mongoose";
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL!);
    console.log("Server connected to database");
  } catch (error) {
    console.log(error);
  }
};
