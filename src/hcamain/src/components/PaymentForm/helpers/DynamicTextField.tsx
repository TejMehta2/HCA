import TextField from '@component-library/core-components/form/basic/TextField/TextField';
import { InputTemplate } from '../PaymentForm.types';

const DynamicTextField = ({
  name,
  type = 'text',
  defaultValue,
  getField,
  formErrors,
}: {
  name: string;
  type?: 'text' | 'email';
  defaultValue?: string;
  getField: <T>(name: string) => T;
  formErrors: Map<string, string>;
}) => (
  <TextField
    label={getField<InputTemplate>(name)?.title.value}
    name={name}
    error={formErrors?.get(name)}
    type={type}
    defaultValue={
      defaultValue || getField<InputTemplate>(name).defaultValue.value || ''
    }
    placeholder={getField<InputTemplate>(name).placeholderText?.value}
  />
);

export default DynamicTextField;
