import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Topic } from "~/lib/domain";
import { UsePagenation } from "./UsePagenation";

type Props = {
  data: Topic[] | null;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

export const TopicList = ({
  data,
  page,
  pageSize,
  totalItems,
  onPageChange,
}: Props) => {
  if (data == null || data.length === 0) {
    return (
      <div className="text-center text-gray-600">
        データがありませんでした。
      </div>
    );
  }

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {data.map((e) => (
          <Card
            key={e.fileName}
            onClick={() => {
              const url = `/topic/downloard/${e.id}`;
              window.location.href = url;
            }}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <CardHeader className="bg-teal-500 text-white p-4">
              <CardTitle className="text-xl font-semibold">
                {e.topicName}
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                ダウンロードして下さい。
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{e.fileName}</p>
            </CardContent>
            <CardFooter className="bg-gray-100 p-3 text-gray-500 text-sm">
              投稿日: {e.createAt}
            </CardFooter>
          </Card>
        ))}
      </div>

      <UsePagenation
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalItems={totalItems}
        page={page}
      />
    </div>
  );
};
