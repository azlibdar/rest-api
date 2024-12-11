import crypto from "crypto";

// AUTH SECRET KEY
const SECRET = process.env.AUTH_SECRET || "AZLAN-REST-API";

// Generate Random Token
export const generateRandomToken = (): string => {
  return crypto.randomBytes(128).toString("base64");
};

// Hash Password
export const hashPassword = (salt: string, password: string) => {
  return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex");
};
