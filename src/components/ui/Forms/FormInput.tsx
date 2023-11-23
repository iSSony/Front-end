// Imports
import { Form as BootstrapForm } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

// Types
interface IInput {
  name: string;
  type?: string;
  size?: "sm" | "lg" | undefined;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label && (
        <p className="mb-2">
          {required && <span className="text-danger me-1">*</span>}
          {label}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <BootstrapForm.Control
            type={type}
            size={size}
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
      <small className="text-danger mt-1">{errorMessage}</small>
    </>
  );
};

export default FormInput;
