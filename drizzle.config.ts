import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/db/schema.ts",
  out: "./app/db/drizzle",
  dbCredentials: {
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "password123",
    host: String(process.env.DB_HOST) || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: String(process.env.DB_NAME || "sample-router"),
    ssl: false,
  },
});
