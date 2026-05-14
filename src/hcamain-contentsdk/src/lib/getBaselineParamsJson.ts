import { FilterOptionJson, ApiSearchPropsJson } from 'src/types/searchProps';
import { unpackFilterOptionJson } from './unpackFilterOption';

export const splitOptionToEntry = (
  option: FilterOptionJson
): [string, string] => {
  const { key, value } = unpackFilterOptionJson(option);
  return [key, value];
};

const getBaselineParamsJson = (props: ApiSearchPropsJson) => {
  const filterByList =
    props.fields?.data?.item?.filterBy?.targetItems?.map(splitOptionToEntry) ||
    [];
  const searchByList =
    props.fields?.data?.item?.searchBy?.targetItems?.map(splitOptionToEntry) ||
    [];
  const defaultLimit = props.fields?.data?.item?.resultsPerPage?.value || 6;
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

export default getBaselineParamsJson;
