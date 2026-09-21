import { db } from "../db.js";

export async function findUserByEmail(email: string) {
  return db.orm.public.User.where({ email }).first();
}

export async function findUserById(id: string) {
  return db.orm.public.User.where({ id }).first();
}