import { db } from "../db.js";

export async function findUserByEmail(email: string) {
  return db.orm.public.User.where({ email }).first();
}

export async function findUserById(id: string) {
  return db.orm.public.User.where({ id }).first();
}


export async function updateUserById(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
    district?: string;
  }
) {
  const safeData = {
    ...(data.firstName !== undefined && {
      firstName: data.firstName,
    }),
    ...(data.lastName !== undefined && {
      lastName: data.lastName,
    }),
    ...(data.phone !== undefined && {
      phone: data.phone,
    }),
    ...(data.city !== undefined && {
      city: data.city,
    }),
    ...(data.district !== undefined && {
      district: data.district,
    }),
  };

  return db.orm.public.User
    .where({ id })
    .update(safeData);
}


export async function getUserProfileById(id: string) {
  const user = await db.orm.public.User.where({ id }).first();

  if (!user) {
    return null;
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
