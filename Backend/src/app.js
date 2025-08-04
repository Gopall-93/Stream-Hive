import express, { urlencoded, json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./Routes/index.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./utils/Error/globalErrorHandler.js";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use("/api", router);

app.use(globalErrorHandler);
