import React from 'react';
import YextFilters from './YextFilters';
import {
  Matcher,
  NumberRangeValue,
  useSearchActions,
  useSearchState,
} from '@yext/search-headless-react';

import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';

//  integration based on https://hitchhikers.yext.com/guides/search-react-custom-facets/

const YextFiltersAdaptor = (): JSX.Element | JSX.Element[] => {
  const facets = useSearchState((state) => state.filters.facets);
  const resultCount = useSearchState((state) => state.vertical.resultsCount);

  const searchActions = useSearchActions();

  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean,
    fieldId: string,
    matcher = Matcher.Equals
  ) => {
    searchActions.setFacetOption(fieldId, { matcher, value }, selected);
    searchActions.executeVerticalQuery();
  };

  const filters: JSX.Element[] = (facets ?? [])
    .map((facet) => {
      if (
        facet.options[0]?.matcher === '$eq' &&
        ['c_locationCity', 'address.city'].includes(facet.fieldId)
      ) {
        return (
          <YextFilters
            filtersTitle={facet?.displayName}
            resultsCount={resultCount}
            key={facet.fieldId}
          >
            <Checkboxes>
              {facet.options.map((filter, index) => (
                <Checkbox
                  id={String(filter.value)}
                  label={filter.displayName}
                  name={facet.fieldId}
                  value={String(filter.value)}
                  key={index}
                  onChange={() =>
                    handleFacetClick(
                      filter.value,
                      !filter.selected,
                      facet.fieldId
                    )
                  }
                ></Checkbox>
              ))}
            </Checkboxes>
          </YextFilters>
        );
      }
      return null; // Returning null for non-matching facets
    })
    .filter((filter): filter is JSX.Element => filter !== null);

  return filters.length > 0 ? filters : [];
};

export default YextFiltersAdaptor;
