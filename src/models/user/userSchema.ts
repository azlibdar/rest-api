import mongoose from "mongoose";

// User schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username cannot exceed 50 characters"],
      unique: true,
      lowercase: true,
    },
    email: { type: String, required: [true, "Email is required"], unique: true, trim: true, lowercase: true },
    authentication: {
      password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the model
export const UserModel = mongoose.model("User", UserSchema);
