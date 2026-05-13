import TextField from '@component-library/core-components/form/basic/TextField/TextField';
import { InputTemplate } from '../PaymentForm.types';

const DynamicTextField = ({
  name,
  type = 'text',
  getField,
  formErrors,
  defaultValue,
}: {
  name: string;
  type?: 'text' | 'email' | 'date';
  defaultValue?: string;
  getField: <T>(name: string) => T;
  formErrors: Map<string, string>;
}) => {
  const field = getField<InputTemplate>(name);
  if (!field) return <></>;
  return (
    <TextField
      label={field?.title.value}
      name={name}
      error={formErrors?.get(name)}
      type={type}
      defaultValue={defaultValue || field?.defaultValue?.value}
      placeholder={field?.placeholderText?.value}
      helpText={field?.helperText?.value}
    />
  );
};

export default DynamicTextField;
