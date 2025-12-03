import { FilterOption } from 'src/types/searchProps';

const formatId = (id?: string) => id?.toLowerCase()?.replaceAll('-', '');

const unpackFilterOption = ({ fields }: FilterOption) => {
  const { Filter, FilterValueGuid, FilterValueString, DisplayName } = fields;
  const key = Filter?.value || '';
  const value = formatId(FilterValueGuid?.id) || formatId(FilterValueGuid?.value?.value) || FilterValueString.value || '';
  return {
    id: `${key}-${value}`,
    key,
    value,
    displayName: DisplayName?.value || '',
  };
};

export default unpackFilterOption;
