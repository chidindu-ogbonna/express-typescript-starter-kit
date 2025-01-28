import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import { logger } from "@/core/middleware/appLogger";
import errorHandler from "@/core/middleware/errorHandler";
// import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/core/middleware/requestLogger";
import { env } from "@/core/utils/envConfig";
import { webBrowserRouter } from "./api/web-browser/router";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter); // TODO: Uncomment this if you want to use rate limiting

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use("/web-browser", webBrowserRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
