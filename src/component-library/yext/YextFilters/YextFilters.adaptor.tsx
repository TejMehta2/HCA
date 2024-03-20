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
// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project

const YextFiltersAdaptor = (): JSX.Element => {
  //const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available

  const facets = useSearchState((state) => state.filters.facets);
  console.log(facets);

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

  const filters =
    facets?.length &&
    facets.map((facet) => {
      return (
        <YextFilters
          filtersTitle={facet?.displayName}
          resultsCount={resultCount}
          key={facet.fieldId}
        >
          <Checkboxes>
            {facet.options.map((filter, index) => (
              <Checkbox
                id={filter.value}
                label={filter.displayName}
                name={facet.fieldId}
                value={filter.value}
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
    });

  return facets && facets?.length ? filters : <></>;
};

export default YextFiltersAdaptor;
