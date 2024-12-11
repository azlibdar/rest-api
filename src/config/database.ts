import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("MongoDB connection string is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Could not connect to the database:", error);
    process.exit(1);
  }
};

// Setup error handling for mongoose connection
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

export default connectDB;
