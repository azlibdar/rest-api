import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

export default (): express.Router => {
  authRoutes(router);
  userRoutes(router);
  return router;
};
