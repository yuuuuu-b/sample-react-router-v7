import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";

import { UserList } from "~/components/parts/UserList";

import { selectUser, selectUserCount } from "~/db/query";
import { logout, requireUserSession } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 0;

  const pageSize = 20;

  const serverData = await selectUser(page, pageSize);
  const totalCount = await selectUserCount();

  return { serverData, totalCount, page, pageSize };
}

// export const action = async () => {
//   return await logout();
// };

export default function user() {
  const { serverData, totalCount, page, pageSize } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className=" max-w-7xl mx-auto">
      <UserList
        data={serverData}
        page={page}
        pageSize={pageSize}
        totalItems={totalCount.count || 0}
        onPageChange={(newPage) => {
          navigate(`?page=${newPage}`);
        }}
      />
    </div>
  );
}
