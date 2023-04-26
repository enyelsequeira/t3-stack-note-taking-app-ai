import type { TextInputProps } from "@mantine/core";
import { TextInput } from "@mantine/core";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type OwnInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextInputProps, "value" | "defaultValue">;

export function OwnInput<T extends FieldValues>({
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
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <TextInput
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
