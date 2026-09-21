import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { db } from "../db.js";
import { AppError } from "../utils/app-error.js";
import { findUserByEmail } from "../repositories/user.repository.js";


export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: "RESTAURANT" | "NGO" | "VOLUNTEER" | "ADMIN";
  city?: string;
  district?: string;
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const passwordHash = await hashPassword(input.password);

  const user = await db.orm.public.User.create({
  firstName: input.firstName,
  lastName: input.lastName,
  email: input.email,
  passwordHash,
  phone: input.phone,
  role: input.role,
  city: input.city,
  district: input.district,
});

const { passwordHash: _passwordHash, ...safeUser } = user;

return safeUser;
}

export async function loginUser(
  userId: string,
  role: RegisterInput["role"],
  password: string,
  passwordHash: string
) {
  const passwordMatches = await comparePassword(password, passwordHash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken({
    userId,
    role,
  });

  return {
    token,
  };
}
