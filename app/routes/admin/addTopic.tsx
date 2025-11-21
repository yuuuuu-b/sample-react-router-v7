import { insertTopic } from "~/db/mutation";
import type { Route } from "./+types/addTopic";
import { data } from "react-router";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";

export const addTopicSchema = z.object({
  topicName: z.string(),
  file: z.custom<File>(),
});

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: addTopicSchema });
    if (submission.status !== "success") {
      return submission.reply();
    }

    const fileBuffer = Buffer.from(await submission.value.file.arrayBuffer());

    return await insertTopic(
      submission.value.topicName,
      submission.value.file.name,
      submission.value.file.type,
      fileBuffer
    );
  } catch (error: any) {
    return data({ error: "処理に失敗しました。" }, { status: 500 });
  }
}
