import type { MultiSelectProps } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type OwnMultiSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<MultiSelectProps, "value" | "defaultValue">;

export function OwnMultiSelect<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: OwnMultiSelectProps<T>) {
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
    <MultiSelect
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
