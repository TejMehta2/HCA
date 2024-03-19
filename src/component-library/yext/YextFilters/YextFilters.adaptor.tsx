import React from 'react';
import { useSearchState } from '@yext/search-headless-react';
import { executeSearch } from '@yext/search-ui-react';
import YextFilters from './YextFilters';

import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project

const YextFiltersAdaptor = (): JSX.Element => {
  //const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available

  const facets = useSearchState((state) => state.filters.facets);
  console.log(facets);
  console.log(facets && facets[0].displayName);

  const resultCount = 20;
  const title = 'Tests, Scans, Treatments';
  const filters = [
    {
      id: '1',
      label: 'Conditions (20)',
      name: 'conditions',
      value: 'conditions',
    },

    { id: '2', label: 'Tests (15)', name: 'tests', value: 'tests' },

    { id: '3', label: 'Treatments (2)', name: 'tests', value: 'tests' },
  ];

  return facets?.length && facets[0] ? (
    <YextFilters
      filtersTitle={facets[0]?.displayName}
      resultsCount={resultCount}
    >
      <Checkboxes>
        {facets[0]?.options.map((filter, index) => (
          <Checkbox
            id={filter.value}
            label={filter.displayName}
            name={facets[0]?.fieldId}
            value={filter.value}
            key={index}
          ></Checkbox>
        ))}
      </Checkboxes>
    </YextFilters>
  ) : (
    <></>
  );
};

export default YextFiltersAdaptor;
