export type Topic = {
  id: string;
  topicName: string;
  fileName: string;
  createAt: string;
};

export type User = {
  id: string;
  name: string;
  role: Role;
  age: number;
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type ActionData =
  | { validationMessages: Record<string, string[]> }
  | { errors: string }
  | undefined;
