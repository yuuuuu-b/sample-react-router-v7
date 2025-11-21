import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Button } from "../ui/button";
import Loading from "../ui/loading";
import { Alert, AlertDescription } from "../ui/alert";

export const DeleteTopic = ({ id }: { id: string }) => {
  const fetcher = useFetcher();

  const [error, setError] = useState<string | null>(null);

  const isSubmitting = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";

  useEffect(() => {
    if (isIdle && fetcher.data && fetcher.data.error) {
      setError(fetcher.data.error);
    }
  }, [isIdle, fetcher.data]);

  return (
    <fetcher.Form method="post" action={`/topic/delete/${id}`}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="bg-white text-teal-700 px-4 py-2 rounded-md shadow-sm border border-teal-500 hover:bg-teal-600 hover:text-white transition-all"
      >
        削除
      </Button>
      {isSubmitting && <Loading show={true} />}
    </fetcher.Form>
  );
};
