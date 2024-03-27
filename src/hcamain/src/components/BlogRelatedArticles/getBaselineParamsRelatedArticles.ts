import { FilterOption } from '../../types/searchProps';
import unpackFilterOption from 'lib/unpackFilterOption';
import { BlogRelatedArticlesProps } from './BlogRelatedArticles.types';

export const splitOptionToEntry = (option: FilterOption): [string, string] => {
  const { key, value } = unpackFilterOption(option);
  return [key, value];
};

const getBaselineParamsRelatedArticles = (props: BlogRelatedArticlesProps) => {
  // Immutable CMS params
  const filterByList =
    props.fields?.data?.item?.filterOptions?.FilterByList?.map(
      splitOptionToEntry
    ) || [];
  const SearchByList =
    props?.fields?.data?.item?.searchBy?.SearchByList?.map(
      splitOptionToEntry
    ) || [];
  const defaultLimit =
    props.fields?.data?.item?.numberOfCards?.jsonValue?.value || 6;
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

export default getBaselineParamsRelatedArticles;
