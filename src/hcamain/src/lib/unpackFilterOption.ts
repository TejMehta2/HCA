import { FilterOption, FilterOptionJson } from 'src/types/searchProps';

const formatId = (id?: string) => id?.toLowerCase()?.replace(/[-{}]/g, '');

const unpackFilterOption = ({ fields }: FilterOption) => {
  const { Filter, FilterValueGuid, FilterValueString, DisplayName } = fields;
  const key = Filter?.value || '';
  const value =
    formatId(FilterValueGuid?.id) ||
    formatId(FilterValueGuid?.value) ||
    FilterValueString.value ||
    '';
  return {
    id: `${key}-${value}`,
    key,
    value,
    displayName: DisplayName?.value || '',
  };
};

export const unpackFilterOptionJson = ({
  filter,
  filterValueGuid,
  filterValueString,
  displayName,
}: FilterOptionJson) => {
  const key = filter?.value || '';
  const value =
    formatId(filterValueGuid?.targetItem?.id) || filterValueString?.value || '';
  return {
    id: `${key}-${value}`,
    key,
    value,
    displayName: displayName?.value || '',
  };
};

export default unpackFilterOption;
