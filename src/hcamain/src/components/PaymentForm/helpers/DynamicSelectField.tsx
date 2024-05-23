import { Option } from '@component-library/core-components/form/basic/SelectField/SelectField.types';
import { DropDownListTemplate } from '../PaymentForm.types';
import SelectField from '@component-library/core-components/form/basic/SelectField/SelectField';

const DynamicSelectField = ({
  name,
  getField,
  formErrors,
  onChange,
  optionMapper = (result: { displayName: string; name: string }) => ({
    text: result.displayName,
    value: result.name,
  }),
}: {
  name: string;
  getField: <T>(name: string) => T;
  formErrors: Map<string, string>;
  onChange?: (option: Option) => void;
  optionMapper?: (result: unknown) => Option;
}) => {
  const field = getField<DropDownListTemplate>(name);
  if (!field) return <></>;
  return (
    <SelectField
      key={name}
      name={name}
      id={name}
      label={field?.title?.value}
      options={getField<DropDownListTemplate>(
        name
      )?.datasource?.targetItem?.children?.results?.map(optionMapper)}
      error={formErrors?.get(name)}
      placeholder={field?.placeholderText?.value}
      defaultValue={{
        text: field?.defaultSelection?.value,
        value: field?.defaultSelection?.value,
      }}
      onChange={onChange}
    />
  );
};

export default DynamicSelectField;
