import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  const statusCode =
    "statusCode" in error && typeof error.statusCode === "number"
      ? error.statusCode
      : 500;

  return errorResponse(
    res,
    statusCode === 500 ? "Internal server error" : error.message,
    statusCode
  );
}