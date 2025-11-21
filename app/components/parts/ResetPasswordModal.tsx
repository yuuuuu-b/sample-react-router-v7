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
import type { User } from "~/lib/domain";
import { Alert, AlertDescription } from "../ui/alert";
import { Form } from "./Form";
import { useForm } from "@conform-to/react";
import { resetPasswordSchema } from "~/routes/admin/resetPassword";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import InputForm from "./InputForm";

type Props = {
  user: User;
};

export const ResetPasswordModal = ({ user }: Props) => {
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  const isIdle = fetcher.state === "idle";

  const [form] = useForm<z.infer<typeof resetPasswordSchema>>({
    constraint: getZodConstraint(resetPasswordSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordSchema });
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
        <Button variant="outline">パスワードリセット</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user.name} のパスワードリセット</DialogTitle>
          <DialogDescription>
            パスワードをリセットする場合は、新しいパスワードを入力して保存してください。
          </DialogDescription>
        </DialogHeader>

        {fetcher.data && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{fetcher.data}</AlertDescription>
          </Alert>
        )}

        <Form form={form} fetcher={fetcher} action={`/reset/${user.id}`}>
          <InputForm name="password" label="新しいパスワード" type="password" />

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
                // disabled={isSubmitting}
                className="bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                リセット
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
