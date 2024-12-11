import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../models/user/userModel";
import { get, merge } from "lodash";

// IS OWNER
export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let currentUserId = get(req, "identity");

    if (!currentUserId) {
      return res.status(401).json({ error: "Failed to authenticate owner!" });
    }

    if (currentUserId != id) {
      return res.status(401).json({ error: "Failed to authenticate owner!" });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to authenticate owner! An error occurred." });
  }
};

// IS AUTHENTICATED
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies.SESSION_TOKEN;

    if (!sessionToken) {
      return res.status(401).json({ error: "Authentication failed!" });
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).json({ error: "Authentication failed!" });
    }

    merge(req, { identity: user._id });

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Authentication failed!" });
  }
};
