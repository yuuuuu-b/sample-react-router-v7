import { data } from "react-router";
import { selectTopicById } from "~/db/query";
import type { Route } from "./+types/downloardTopic";
type File = {
  data: Buffer;
  type: string;
};

export async function loader({ params }: Route.ActionArgs) {
  const { id } = params;
  if (!id) {
    return data({ error: "IDが提供されていません。" }, { status: 400 });
  }

  try {
    const result = await selectTopicById(id);

    if (!result) {
      return data({ error: "ファイルが見つかりません。" }, { status: 400 });
    }

    // ファイルデータをレスポンスとして返却
    const { fileName, fileType, file } = result;

    if (file) {
      const body = new Uint8Array(file as Buffer);
      return new Response(body, {
        headers: {
          "Content-Type": fileType || "application/octet-stream",
          "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
            fileName
          )}`,
        },
      });
    } else {
      return data(
        { error: "無効なファイルデータが取得されました。" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("ファイルダウンロードエラー:", error);
    return data(
      { error: "ファイルダウンロード中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
