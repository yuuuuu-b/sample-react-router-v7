import type { Topic, User } from "~/lib/domain";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { UsePagenation } from "./UsePagenation";
import { AddTopicModal } from "./AddTopicModal";
import { Button } from "../ui/button";
import { DeleteTopic } from "./DeleteTopic";

type Props = {
  data: Topic[] | null;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

export const AdminTopicList = ({
  data,
  page,
  pageSize,
  totalItems,
  onPageChange,
}: Props) => {
  if (data == null || data.length === 0) {
    return (
      <>
        <div className="flex items-center justify-between mx-10 mb-4">
          <h2 className="text-lg font-bold text-gray-800">トピックリスト</h2>
          <AddTopicModal />
        </div>
        <div className="text-center text-gray-600">
          データがありませんでした。
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mx-10 mb-4">
        <h2 className="text-lg font-bold text-gray-800">トピックリスト</h2>
        <AddTopicModal />
      </div>

      <div className="mx-10">
        <Table className="border-collapse border border-gray-300 shadow-md rounded-lg w-full">
          <TableCaption className="text-sm text-gray-500 p-4">
            トピックの一覧です。
          </TableCaption>
          <TableHeader className="bg-teal-500 border-b border-gray-300">
            <TableRow>
              <TableHead className="p-3 text-left font-semibold w-[100px] text-white">
                トピック名
              </TableHead>
              <TableHead className="p-3 text-left font-semibold  text-white">
                ファイル名
              </TableHead>
              <TableHead className="p-3 text-left font-semibold text-white">
                作成日
              </TableHead>
              <TableHead className="p-3 text-right font-semibold text-white">
                ダウンロード
              </TableHead>
              <TableHead className="p-3 text-right font-semibold text-white">
                削除
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((e) => (
              <TableRow
                key={e.id}
                className="hover:bg-teal-50 border-b border-gray-200 last:border-none"
              >
                <TableCell className="p-3 font-medium text-gray-900">
                  {e.topicName}
                </TableCell>
                <TableCell className="p-3 font-medium text-gray-900">
                  {e.fileName}
                </TableCell>
                <TableCell className="p-3 text-gray-700">
                  {e.createAt}
                </TableCell>
                <TableCell className="p-3 text-right">
                  <Button
                    className="bg-white text-teal-700 px-4 py-2 rounded-md shadow-sm border border-teal-500 hover:bg-teal-600 hover:text-white transition-all"
                    onClick={() => {
                      const url = `/topic/downloard/${e.id}`;
                      window.location.href = url;
                    }}
                  >
                    ダウンロード
                  </Button>
                </TableCell>
                <TableCell className="p-3 text-right">
                  <DeleteTopic id={e.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
