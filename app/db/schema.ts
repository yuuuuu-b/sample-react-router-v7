import {
  date,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { Role } from "~/lib/domain";

export const mySchema = pgSchema("my_schema");

export const RoleEnum = mySchema.enum("role", enumToPgEnum(Role));

export const usersTable = mySchema.table("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: RoleEnum().notNull().default(Role.USER),
});

export const topicTable = mySchema.table("topics", {
  id: uuid().primaryKey().defaultRandom(),
  topicName: varchar({ length: 255 }).notNull(),
  fileName: varchar({ length: 255 }).notNull(),

  fileType: varchar({ length: 255 }).notNull(),
  file: jsonb().notNull(),
  createAt: date().defaultNow().notNull(),
});

export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}
