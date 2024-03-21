import { FilterOption, ApiSearchProps } from '../../../types/searchProps';
import unpackFilterOption from 'lib/unpackFilterOption';

export const splitOptionToEntry = (option: FilterOption): [string, string] => {
  const { key, value } = unpackFilterOption(option);
  return [key, value];
};

const getBaselineParams = (props: ApiSearchProps) => {
  // Immutable CMS params
  const filterByList =
    props.fields?.data?.FilterBy?.item?.filterOptions.map(splitOptionToEntry) ||
    [];
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
