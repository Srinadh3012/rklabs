import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set in environment variables. Falling back to mock DB.");
}

const connectionString = process.env.DATABASE_URL || "postgresql://mock:mock@mock.neon.tech/mock";
const sql = neon(connectionString);
export const db = drizzle(sql);
