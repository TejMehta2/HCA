import { FilterOptionJson, ApiSearchPropsJson } from '../types/searchProps';
import { unpackFilterOptionJson } from './unpackFilterOption';

export const splitOptionToEntry = (
  option: FilterOptionJson
): [string, string] => {
  const { key, value } = unpackFilterOptionJson(option);
  return [key, value];
};

const getBaselineParamsJson = (props: ApiSearchPropsJson) => {
  // Immutable CMS params
  const filterByList =
    props.fields?.data?.item?.filterBy?.targetItems?.map(splitOptionToEntry) ||
    [];
  const SearchByList =
    props.fields?.data?.item?.searchBy?.targetItems?.map(splitOptionToEntry) ||
    [];
  const defaultLimit = props.fields?.data?.item?.resultsPerPage?.value || 6;
  const defaultOffset = 0;

  const baselineParams: [string, string][] = [
    ...SearchByList,
    ...filterByList,
    ['limit', `${defaultLimit}`],
    ['offset', `${defaultOffset}`],
  ];

  const baselineAutocompleteParams: [string, string][] = [...SearchByList];
  return {
    defaultLimit,
    defaultOffset,
    baselineParams,
    baselineAutocompleteParams,
  };
};

export default getBaselineParamsJson;
