import { eq } from "drizzle-orm";
import db from ".";
import { topicTable, usersTable } from "./schema";
import pkg from "bcryptjs";
import { error } from "console";

export const insertUser = async (
  name: string,
  age: number,
  password: string
) => {
  const result = await db
    .insert(usersTable)
    .values({ name: name, age: age, password: password })
    .returning({ insertedId: usersTable.id });

  return result[0];
};

export const resetPassword = async (id: string, password: string) => {
  const { hash } = pkg;
  const pass = await hash(password, 12);
  return await db
    .update(usersTable)
    .set({ password: pass })
    .where(eq(usersTable.id, id));
};
export const deleteTopic = async (id: string) => {
  return await db
    .delete(topicTable)

    .where(eq(topicTable.id, id))
    .execute();
};

export const insertTopic = async (
  topicName: string,
  fileName: string,
  fileType: string,
  file: Buffer
) => {
  return await db.insert(topicTable).values({
    topicName: topicName,
    fileName: fileName,
    fileType: fileType,
    file: file,
  });
};
