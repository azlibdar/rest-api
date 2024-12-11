import { Request, Response } from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../models/user/userModel";
import { generateRandomToken, hashPassword } from "../utils/authUtils";

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  try {
    // Retrieve session token from cookies
    const sessionToken = req.cookies.SESSION_TOKEN;

    if (!sessionToken) {
      return res.status(200).json({ message: "Logout successful!" });
    }

    // Find the user by session token
    const user = await getUserBySessionToken(sessionToken);
    if (!user || !user.authentication?.sessionToken) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    // Clear the session token
    user.authentication.sessionToken = null;
    await user.save();

    // Clear the cookie
    res.clearCookie("SESSION_TOKEN", { domain: "localhost", path: "/" });

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Logout failed!" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user || !user.authentication?.password || !user.authentication?.salt) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Check if password is correct
    const expectedPassword = hashPassword(user.authentication.salt, password);
    if (expectedPassword !== user.authentication.password) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // If password is correct generate session token
    const salt = generateRandomToken();
    const sessionToken = hashPassword(salt, user._id.toString());
    user.authentication.sessionToken = sessionToken;
    await user.save();

    res.cookie("SESSION_TOKEN", sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed!" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const salt = generateRandomToken();
    const passwordHash = hashPassword(salt, password);

    // Create new user
    const newUser = await createUser({
      username,
      email,
      authentication: {
        password: passwordHash,
        salt,
      },
    });

    return res.status(201).json({ message: "Registration successful!", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Registration failed!" });
  }
};
