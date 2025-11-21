import type { Route } from "./+types/home";
import { data } from "react-router";
import { Form, Link, redirect } from "react-router";
import { commitSession, getSession } from "~/sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/dashboard");
  }
  return {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          ようこそ！
        </h1>
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="flex flex-col gap-4 text-center">
          <Link
            to="/sigin"
            className=" w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:bg-teal-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            新規登録
          </Link>
          <Link
            to="/login"
            className="w-full bg-transparent text-teal-600 py-4 rounded-lg border-2 border-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
