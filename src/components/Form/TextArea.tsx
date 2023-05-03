import type { TextareaProps, TextInputProps } from "@mantine/core";
import { Textarea, TextInput } from "@mantine/core";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type OwnInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextareaProps, "value" | "defaultValue">;

export function OwnTextArea<T extends FieldValues>({
                                                     name,
                                                     control,
                                                     defaultValue,
                                                     rules,
                                                     shouldUnregister,
                                                     onChange,
                                                     ...props
                                                   }: OwnInputProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister
  });

  return (
    <Textarea
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
