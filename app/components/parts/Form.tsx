import { FormProvider, getFormProps } from "@conform-to/react";
import type {
  FormContext,
  FormMetadata,
  Wrapped,
} from "node_modules/@conform-to/react/context";
import type { ReactNode } from "react";
import type { FetcherWithComponents } from "react-router";
import Loading from "../ui/loading";

export type FormProps<T extends Record<string, unknown>> = {
  fetcher: FetcherWithComponents<any>;
  form: FormMetadata<T, string[]>;
  children: ReactNode;
  action?: string;
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | undefined;
};

export function Form<T extends Record<string, unknown>>({
  form,
  fetcher,
  children,
  action = "",
  encType = undefined,
}: FormProps<T>) {
  return (
    <FormProvider context={form.context}>
      <fetcher.Form
        {...getFormProps(form)}
        method="post"
        className="space-y-8"
        action={action}
        encType={encType}
      >
        {children}
      </fetcher.Form>
      <Loading show={fetcher.state !== "idle"} />
    </FormProvider>
  );
}
