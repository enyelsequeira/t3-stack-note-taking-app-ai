import type {
  FieldValues,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  autoComplete?: string;
  register: UseFormRegister<FieldValues> | any;
  error: string | undefined;
  errorClassName?: string;
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
  errorClassName,
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
      {error && (
        <p className={errorClassName ? errorClassName : "hidden"}>{error}</p>
      )}
    </div>
  );
};

export default Input;
