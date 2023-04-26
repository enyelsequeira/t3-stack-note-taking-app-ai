import {
  Box,
  CloseButton,
  Group,
  MultiSelectProps,
  MultiSelectValueProps,
  Text,
  rem,
} from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { IconHash } from "@tabler/icons";
import { forwardRef } from "react";
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
      valueComponent={Value}
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

function Value({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => {
          console.log({ datasss: theme.spacing.xs, theme });
          return {
            display: "flex",
            cursor: "default",
            alignItems: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[4]
            }`,
            paddingInline: theme.spacing.xs,
            borderRadius: theme.radius.sm,
          };
        }}
      >
        <IconHash size={12} />
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}
