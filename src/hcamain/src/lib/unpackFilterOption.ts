/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOption, FilterOptionJson } from 'src/types/searchProps';

type SitecoreIdLike = string | { id?: string } | null | undefined;

export const formatId = (id: SitecoreIdLike) => {
  const s =
    typeof id === 'string'
      ? id
      : (id?.id ?? (id as any)?.id ?? (id as any)?.guid);

  return typeof s === 'string'
    ? s.toLowerCase().replace(/[-{}]/g, '')
    : undefined;
};

const unpackFilterOption = ({ fields }: FilterOption) => {
  const { Filter, FilterValueGuid, FilterValueString, DisplayName } = fields;
  const key = Filter?.value || '';
  const value = formatId(FilterValueGuid) || FilterValueString.value || '';
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
