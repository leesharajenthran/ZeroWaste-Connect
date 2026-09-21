import express from "express";
import cors from "cors";

import { errorMiddleware } from "./middleware/error.middleware.js";
import { successResponse } from "./utils/response.js";
import authRoutes from "./routes/auth.routes.js";
import { env } from "./config/env.js";
import helmet from "helmet";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { requestLogMiddleware } from "./middleware/request-log.middleware.js";

const app = express();
app.use(requestLogMiddleware);
app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  return successResponse(
    res,
    "ZeroWaste Connect API is running",
    {
      database: "connected",
    }
  );
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;