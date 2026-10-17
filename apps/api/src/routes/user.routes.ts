
import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateProfileSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get("/me", authenticate, getMyProfile);

router.patch(
  "/me",
  authenticate,
  validate(updateProfileSchema),
  updateMyProfile
);

export default router;
