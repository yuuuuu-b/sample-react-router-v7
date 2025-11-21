import {
  Form,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  type ActionFunctionArgs,
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { Button } from "~/components/ui/button";
import { selectById } from "~/db/query";
import { Role } from "~/lib/domain";
import { getUserFromSession, logout } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromSession(request);

  if (user) {
    return selectById(user.userId);
  } else {
    return null;
  }
}

export default function TopbarLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <nav className="fixed top-0 w-full h-16 bg-gradient-to-r from-teal-500 to-teal-700 z-10 shadow-md">
          <div className="flex justify-between items-center px-6 md:px-8 lg:px-12 h-full max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-white font-bold text-2xl tracking-wide hover:opacity-90 transition-opacity"
              >
                React Router Sample
              </Link>

              {data?.role === Role.ADMIN && (
                <>
                  <Link
                    to="/user"
                    className="text-white font-medium hover:underline transition-all"
                  >
                    ユーザ一覧
                  </Link>
                  <Link
                    to="/topic"
                    className="text-white font-medium hover:underline transition-all"
                  >
                    トピック管理
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-6">
              {data?.name && (
                <span className="text-white text-sm sm:text-base font-medium whitespace-nowrap">
                  こんにちは、{data.name}さん
                </span>
              )}

              <form
                method="post"
                action="/logout"
                className="flex items-center gap-4"
              >
                {data?.name ? (
                  <Button
                    type="submit"
                    className="bg-white text-teal-700 px-4 py-2 rounded-md shadow-sm border border-teal-500 hover:bg-teal-600 hover:text-white transition-all"
                  >
                    ログアウト
                  </Button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-white text-teal-500 px-4 py-2 rounded-md shadow-sm border border-teal-500 hover:bg-teal-500 hover:text-white transition-all"
                  >
                    ログイン
                  </Link>
                )}
              </form>
            </div>
          </div>
        </nav>

        {/* コンテンツ */}
        <div className="mt-20 px-4 sm:px-6 md:px-8 lg:px-10 ">
          <Outlet />
        </div>

        <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-auto shadow-inner">
          <p className="text-sm">
            © 2025 React Router Sample. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
