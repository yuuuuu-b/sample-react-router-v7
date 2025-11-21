import { resetPassword } from "~/db/mutation";
import type { Route } from "./+types/resetPassword";
import { data } from "react-router";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(4, "パスワードは必須です"),
});

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: resetPasswordSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const uuid = params.userId;

  try {
    await resetPassword(uuid, submission.value.password);
    return;
  } catch (e: any) {
    return data({ error: "処理に失敗しました。" }, { status: 500 });
  }
}
