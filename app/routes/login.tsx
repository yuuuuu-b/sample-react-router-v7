import { z } from "zod";
import {
  data,
  redirect,
  useActionData,
  useFetcher,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/login";
import { getSession, commitSession, login } from "../sessions.server";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Form } from "~/components/parts/Form";

import { Button } from "~/components/ui/button";
import InputForm from "~/components/parts/InputForm";
import { Alert, AlertDescription } from "~/components/ui/alert";

const loginSchema = z.object({
  username: z.string().min(1, "ユーザー名は必須です"),
  password: z.string().min(1, "パスワードは必須です"),
});

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  return {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    return await login(submission.value.username, submission.value.password);
  } catch (error) {
    return error;
  }
}

export default function Login() {
  const fetcher = useFetcher();

  const [form] = useForm<z.infer<typeof loginSchema>>({
    constraint: getZodConstraint(loginSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });
  return (
    <div className=" max-w-sm mx-auto bg-white p-6 mt-20 rounded-lg shadow-md border border-gray-200">
      {fetcher.data && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{fetcher.data}</AlertDescription>
        </Alert>
      )}
      <Form form={form} fetcher={fetcher}>
        <div className="mb-4">
          <InputForm name="username" label="アカウント名" type="text" />
        </div>
        <div className="mb-6">
          <InputForm name="password" label="パスワード" type="password" />
        </div>
        <Button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          ログイン
        </Button>
      </Form>
    </div>
  );
}
