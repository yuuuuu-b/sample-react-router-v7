import { useFetcher } from "react-router";
import { siginIn } from "~/sessions.server";
import { z } from "zod";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Button } from "~/components/ui/button";
import InputForm from "~/components/parts/InputForm";
import { Alert, AlertDescription } from "~/components/ui/alert";
import type { Route } from "./+types/siginIn";
import { Form } from "~/components/parts/Form";

const siginInSchema = z.object({
  username: z.string(),
  password: z.string(),
  age: z.number(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: siginInSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  return await siginIn(
    submission.value.username,
    submission.value.age,
    submission.value.password
  );
}

export default function SiginIn() {
  const fetcher = useFetcher();
  const [form] = useForm<z.infer<typeof siginInSchema>>({
    constraint: getZodConstraint(siginInSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: siginInSchema });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-semibold text-center  mb-6">新規登録</h1>
        {fetcher.data && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{fetcher.data}</AlertDescription>
          </Alert>
        )}
        <Form form={form} fetcher={fetcher}>
          <div>
            <InputForm name="username" label="ユーザー名" type="text" />
          </div>
          <div>
            <InputForm name="age" label="年齢" type="number" />
          </div>
          <div>
            <InputForm name="password" label=" パスワード" type="password" />
          </div>
          <Button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            送信
          </Button>
        </Form>
      </div>
    </div>
  );
}
