import { deleteTopic } from "~/db/mutation";
import type { Route } from "./+types/deleteTopic";
import { data } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const uuid = params.id;

  try {
    return await deleteTopic(uuid!);
  } catch (e: any) {
    console.error(e);
    return data({ error: "処理に失敗しました。" }, { status: 500 });
  }
}
