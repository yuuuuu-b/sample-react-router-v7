import { createCookieSessionStorage, data, redirect } from "react-router";
import { selectByUserName } from "./db/query";
import pkg from "bcryptjs";
import { insertUser } from "./db/mutation";
import { Role } from "./lib/domain";

type SessionData = {
  userId: string;
  role: Role;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // `createCookie`からのCookie、またはCookieを作成するためのCookieOptions
    cookie: {
      name: "__session",

      // これらはすべてオプションです
      // domain: "reactrouter.com",
      // Expiresも設定できます（ただし、maxAgeを組み合わせて使用すると上書きされます）。
      // ただし、この方法は、`new Date`が各サーバーデプロイメントで1つの日付のみを作成し、将来の動的な日付を作成しないため、お勧めしません。
      //
      // expires: new Date(Date.now() + 60_000),
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      path: "/",
      secrets: ["s3cret1"],
      secure: false,
    },
  });

export { getSession, commitSession, destroySession };

async function createUserSession(
  userId: string,
  role: Role,
  redirectPath: string
) {
  const session = await getSession();

  session.set("userId", userId);
  session.set("role", role);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function login(name: string, password: string) {
  const users = await selectByUserName(name);

  if (!users) {
    throw data("ログインに失敗しました。", { status: 401 });
  }

  const passwordMatch = await verifyPassword(password, users.password);

  if (!passwordMatch) {
    throw data("ログインに失敗しました。", { status: 401 });
  }
  return await createUserSession(users.id, users.role, "/dashboard");
}
export async function siginIn(name: string, age: number, password: string) {
  const { hash } = pkg;
  const user = await selectByUserName(name);
  if (user) {
    throw data("そのユーザー名は使われています。", { status: 422 });
  }
  const userId = await hash(password, 12).then((e) => insertUser(name, age, e));

  if (!userId) {
    throw data("登録に失敗しました。", { status: 422 });
  }

  return await createUserSession(userId.insertedId, Role.USER, "/dashboard");
}
export async function logout() {
  const session = await getSession();

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/");
  }

  return userId;
}

export async function getUserFromSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const userId = session.get("userId");
  const role = session.get("role");
  if (!userId || !role) {
    return null;
  }
  const sessionData: SessionData = {
    userId: userId,
    role: role,
  };

  return sessionData;
}

async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const { compare } = pkg;
  const isMatch = await compare(plainPassword, hashedPassword);
  return isMatch;
}
