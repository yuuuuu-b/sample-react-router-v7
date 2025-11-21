import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

const db = drizzle(pool, { schema });

export default db;
