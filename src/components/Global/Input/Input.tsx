import type { UseFormReturn } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  autoComplete?: string;
  register: UseFormReturn["register"];
  error: string | undefined;
};

const Input = ({
  label,
  name,
  type,
  inputClassName,
  labelClassName,
  placeholder,
  wrapperClassName,
  autoComplete,
  register,
  error,
}: Props) => {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className={`${inputClassName} ${error && "border-red-500"}`}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
    </div>
  );
};

export default Input;
