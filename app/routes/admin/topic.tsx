import {
  useLoaderData,
  useNavigate,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { AddTopicModal } from "~/components/parts/AddTopicModal";
import { AdminTopicList } from "~/components/parts/AdminTopicList";
import { TopicList } from "~/components/parts/TopicList";
import { selectTopic, selectTopicCount } from "~/db/query";
import { Role } from "~/lib/domain";
import { logout, requireUserSession } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 0;

  const pageSize = 20;

  const serverData = await selectTopic(page, pageSize);
  const totalCount = await selectTopicCount();

  return { serverData, totalCount, page, pageSize };
}

export default function DashBoard() {
  const { serverData, totalCount, page, pageSize } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className=" max-w-7xl mx-auto">
      <AdminTopicList
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
