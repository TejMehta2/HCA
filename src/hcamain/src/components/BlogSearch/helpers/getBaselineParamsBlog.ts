import { FilterOption, BlogSearchProps } from '../BlogSearch.types';

export const splitOptionToEntry = ({
  fields,
}: FilterOption): [string, string] => {
  return [
    fields.Filter?.value || '',
    fields.FilterValueGuid?.id || fields.FilterValueString.value || '',
  ];
};

const getBaselineParams = (props: BlogSearchProps) => {
  // Immutable CMS params
  const filterByList = props.fields?.FilterBy?.map(splitOptionToEntry) || [];
  const SearchByList = props?.fields?.SearchBy?.map(splitOptionToEntry) || [];
  const defaultLimit = props.fields?.ResultsPerPage?.value || 6;
  const defaultOffset = 0;

  const baselineParams: [string, string][] = [
    ...SearchByList,
    ...filterByList,
    ['limit', `${defaultLimit}`],
    ['offset', `${defaultOffset}`],
  ];

  return {
    defaultLimit,
    defaultOffset,
    baselineParams,
  };
};

export default getBaselineParams;
