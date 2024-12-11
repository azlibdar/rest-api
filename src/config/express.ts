import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import routes from "../routes";

dotenv.config();

const createExpressApp = () => {
  const app = express();

  // Middleware Setup
  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN || "",
    })
  );

  app.use(compression());
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Routes
  app.use("/", routes());

  return app;
};

export default createExpressApp;
