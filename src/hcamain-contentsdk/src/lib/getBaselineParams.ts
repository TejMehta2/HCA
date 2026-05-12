import { FilterOption, ApiSearchProps } from 'src/types/searchProps';
import unpackFilterOption from './unpackFilterOption';

export const splitOptionToEntry = (option: FilterOption): [string, string] => {
  const { key, value } = unpackFilterOption(option);
  return [key, value];
};

const getBaselineParams = (props: ApiSearchProps) => {
  const filterByList = props.fields?.FilterBy?.map(splitOptionToEntry) || [];
  const searchByList = props.fields?.SearchBy?.map(splitOptionToEntry) || [];
  const defaultLimit = props.fields?.ResultsPerPage?.value || 6;
  const defaultOffset = 0;

  const baselineParams: [string, string][] = [
    ...searchByList,
    ...filterByList,
    ['limit', `${defaultLimit}`],
    ['offset', `${defaultOffset}`],
  ];

  const baselineAutocompleteParams: [string, string][] = [...searchByList];
  return {
    defaultLimit,
    defaultOffset,
    baselineParams,
    baselineAutocompleteParams,
  };
};

export default getBaselineParams;
