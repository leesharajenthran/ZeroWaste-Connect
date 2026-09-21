import { Router } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../schemas/auth.schema.js";
import { authRateLimiter } from "../middleware/rate-limit.middleware.js";
const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  register
);

router.post(
  "/login",
  authRateLimiter,
  validate(loginSchema),
  login
);

router.get("/test", (_req, res) => {
  return res.json({
    success: true,
    message: "Auth routes are working",
  });
});

router.get("/protected-test", authenticate, (req, res) => {
  const authReq = req as AuthenticatedRequest;

  return res.json({
    success: true,
    message: "Authentication middleware is working",
    user: authReq.user,
  });
});

router.get(
  "/volunteer-test",
  authenticate,
  authorize("VOLUNTEER"),
  (req: AuthenticatedRequest, res) => {
    return res.json({
      success: true,
      message: "Volunteer authorization is working",
      user: req.user,
    });
  }
);






export default router;