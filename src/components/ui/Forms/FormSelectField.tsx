// Imports
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Form as BootstrapForm } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "sm" | "lg" | undefined;
  value?: string | string[] | undefined;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: any) => void;
  required?: boolean;
};

const FormSelectField = ({
  name,
  size,
  value,
  options,
  label,
  defaultValue,
  handleChange,
  required,
}: SelectFieldProps) => {
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
        render={({ field: { value, onChange } }) => (
          <BootstrapForm.Select
            onChange={handleChange ? handleChange : onChange}
            size={size}
            value={value}
            required={required}
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </BootstrapForm.Select>
        )}
      />
      <small className="text-danger mt-1">{errorMessage}</small>
    </>
  );
};

export default FormSelectField;
