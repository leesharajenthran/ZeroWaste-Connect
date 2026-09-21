import "temporal-polyfill/full/global";
import { env } from "./config/env.js";
import postgres from "@prisma/orm-postgres/runtime";

import type { Contract } from "../prisma/contract.js";
import contractJson from "../prisma/contract.json" with { type: "json" };

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured");
}

export const db = postgres<Contract>({
  contractJson,
  url: env.DATABASE_URL,
});