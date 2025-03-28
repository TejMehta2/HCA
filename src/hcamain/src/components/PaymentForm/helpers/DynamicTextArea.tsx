import TextArea from '@component-library/core-components/Textarea/Textarea';
import { InputTemplate } from '../PaymentForm.types';

const DynamicTextArea = ({
  name,
  getField,
  formErrors,
  defaultValue,
}: {
  name: string;
  getField: <T>(name: string) => T;
  formErrors: Map<string, string>;
  defaultValue?: string;
}) => {
  const field = getField<InputTemplate>(name);
  if (!field) return <></>;
  return (
    <TextArea
      id={name}
      label={field?.title.value}
      name={name}
      errorMessage={formErrors?.get(name)}
      defaultValue={defaultValue || field?.defaultValue?.value}
      helperText={field?.helperText?.value}
      showOptionalText={false}
    />
  );
};

export default DynamicTextArea;
