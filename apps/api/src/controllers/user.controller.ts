import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../services/user.service.js";
import { successResponse } from "../utils/response.js";

export async function getMyProfile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await getCurrentUser(userId);

    return successResponse(
      res,
      "User profile fetched successfully",
      user
    );
  } catch (error) {
    next(error);
  }
}

export async function updateMyProfile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await updateCurrentUser(userId, req.body);

    return successResponse(
      res,
      "User profile updated successfully",
      user
    );
  } catch (error) {
    next(error);
  }
}