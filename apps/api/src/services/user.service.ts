import {
  findUserById,
  updateUserById,
} from "../repositories/user.repository.js";

export async function getCurrentUser(userId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    city: user.city,
    district: user.district,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function updateCurrentUser(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
    district?: string;
  }
) {
  const existingUser = await findUserById(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  await updateUserById(userId, data);

  return getCurrentUser(userId);
}