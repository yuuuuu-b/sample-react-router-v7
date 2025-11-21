import { Input } from "../ui/input";
import type { ReactNode } from "react";
import { Label } from "../ui/label";
import { getInputProps, useField, type FieldName } from "@conform-to/react";
import { cn } from "~/lib/utils";

type InputOptions = Parameters<typeof getInputProps>[1];

type InputFormFieldProps<
  FieldSchema,
  FormSchema extends Record<string, unknown>
> = {
  name: FieldName<FieldSchema, FormSchema, string[]>;
  label?: ReactNode;
} & InputOptions;

export default function InputForm<
  FieldSchema,
  FormSchema extends Record<string, unknown> = Record<string, unknown>
>({
  name,
  label,
  ...inputOptions
}: InputFormFieldProps<FieldSchema, FormSchema>) {
  const [meta] = useField(name);

  return (
    <div className="space-y-2">
      <Label
        className={cn(meta.errors && "text-destructive")}
        htmlFor={meta.id}
      >
        {label}
      </Label>
      <Input
        {...getInputProps(meta, inputOptions)}
        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <p className="text-[0.8rem] font-medium text-destructive">
        {meta.errors}
      </p>
    </div>
  );
}
