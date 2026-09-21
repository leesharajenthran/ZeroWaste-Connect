export type UserRole =
  | "RESTAURANT"
  | "NGO"
  | "VOLUNTEER"
  | "ADMIN";

export interface AuthUser {
  userId: string;
  role: UserRole;
}