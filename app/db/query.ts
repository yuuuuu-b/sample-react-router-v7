import { asc, count, eq } from "drizzle-orm";
import db from ".";
import { topicTable, usersTable } from "./schema";
import { data } from "react-router";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1) {
    return null;
  }
  return values[0]!;
};

export const selectByUserName = async (name: string) => {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name))
    .then(takeUniqueOrThrow);
};

export const selectById = async (id: string) => {
  return await db
    .select({
      id: usersTable.id,
      age: usersTable.age,
      name: usersTable.name,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .then(takeUniqueOrThrow);
};
export const selectUser = async (page: number, pageSize: number) => {
  return await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      age: usersTable.age,
      role: usersTable.role,
    })
    .from(usersTable)
    .limit(pageSize)
    .offset(page)
    .orderBy(asc(usersTable.name));
};
export const selectUserCount = async () => {
  return await db
    .select({
      count: count(),
    })
    .from(usersTable)
    .then(takeUniqueOrThrow);
};

export const selectTopic = async (page: number, pageSize: number) => {
  return await db
    .select({
      id: topicTable.id,
      topicName: topicTable.topicName,
      fileName: topicTable.fileName,
      createAt: topicTable.createAt,
    })
    .from(topicTable)
    .limit(pageSize)
    .offset(page)
    .orderBy(asc(topicTable.createAt));
};
export const selectTopicCount = async () => {
  return await db
    .select({
      count: count(),
    })
    .from(topicTable)
    .then(takeUniqueOrThrow);
};
export const selectTopicById = async (id: string) => {
  return await db
    .select({
      id: topicTable.id,
      fileName: topicTable.fileName,
      fileType: topicTable.fileType,
      file: topicTable.file,
    })
    .from(topicTable)
    .where(eq(topicTable.id, id))
    .then(takeUniqueOrThrow);
};
