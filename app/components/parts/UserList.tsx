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

import { useState } from "react";
import { ResetPasswordModal } from "./ResetPasswordModal";

type Props = {
  data: User[] | null;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

export const UserList = ({
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

  return (
    <div>
      <div className="flex items-center justify-between mx-10 mb-4">
        <h2 className="text-lg font-bold text-gray-800">ユーザリスト</h2>
      </div>
      <div className="mx-10">
        <Table className="border-collapse border border-gray-300 shadow-md rounded-lg w-full">
          <TableCaption className="text-sm text-gray-500 p-4">
            A list of your recent invoices.
          </TableCaption>
          <TableHeader className="bg-teal-500  border-b border-gray-300">
            <TableRow>
              <TableHead className="p-3 text-left font-semibold w-[100px] text-white">
                名前
              </TableHead>
              <TableHead className="p-3 text-left font-semibold text-white">
                年齢
              </TableHead>
              <TableHead className="p-3 text-left font-semibold text-white">
                権限
              </TableHead>
              <TableHead className="p-3 text-right font-semibold text-white">
                操作
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
                  {e.name}
                </TableCell>
                <TableCell className="p-3 text-gray-700">{`${e.age}歳`}</TableCell>
                <TableCell className="p-3 text-gray-700">{e.role}</TableCell>
                <TableCell className="p-3 text-right">
                  <ResetPasswordModal user={e} />
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
