import { Request, Response } from "express";
import { deleteUserById, getUserById, getUsers, updateUserById } from "../models/user/userModel";
import { generateRandomToken, hashPassword } from "../utils/authUtils";

// Upddate user password
export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Check if old password is provided
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get user by id
    const user = await getUserById(id);
    if (!user || !user.authentication?.password || !user.authentication?.salt) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Check if old password is correct
    const expectedPassword = hashPassword(user.authentication.salt, oldPassword);
    if (expectedPassword !== user.authentication.password) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const newSalt = generateRandomToken();

    // Update password
    await updateUserById(id, {
      authentication: {
        salt: newSalt,
        password: hashPassword(newSalt, newPassword),
        sessionToken: null,
      },
    });

    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update password!" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user!" });
  }
};

// List all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get users!" });
  }
};
