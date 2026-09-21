import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import { findUserByEmail } from "../repositories/user.repository.js";

export async function register(req: Request, res: Response) {
  const result = await registerUser(req.body);

  return res.status(201).json({
    success: true,
    data: result,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const result = await loginUser(
    user.id,
    user.role,
    password,
    user.passwordHash
  );

  return res.status(200).json({
    success: true,
    data: result,
  });
}