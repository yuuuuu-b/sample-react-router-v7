import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useFetcher } from "react-router";
import { z } from "zod";
import { useForm } from "@conform-to/react";
import { addTopicSchema } from "~/routes/admin/addTopic";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Form } from "./Form";
import InputForm from "./InputForm";

export const AddTopicModal = () => {
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSubmitting = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";

  const [form] = useForm<z.infer<typeof addTopicSchema>>({
    constraint: getZodConstraint(addTopicSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: addTopicSchema });
    },
  });

  useEffect(() => {
    if (isIdle && !fetcher.data) {
      setOpen(false);
    }
  }, [isIdle, fetcher.data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">トピックを追加</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>トピックの追加</DialogTitle>
          <DialogDescription>
            新しいトピックを追加するには、必要な情報を入力してください。
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-4">エラー: {error}</div>
        )}

        <Form
          fetcher={fetcher}
          form={form}
          action="/topic/add"
          encType="multipart/form-data"
        >
          <InputForm name="topicName" label="トピック名" type="text" />

          <InputForm name="file" label="ファイル" type="file" />

          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button
                type="button"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setOpen(false)}
              >
                閉じる
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                追加
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
