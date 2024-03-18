import React from 'react';

import YextFilters from './YextFilters';
import { CardProps } from '@yext/search-ui-react';

import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project
interface YextResultCardAskAQuestion {}

const YextResultCardArticlesAdaptor = (
  props: CardProps<YextResultCardAskAQuestion>
): JSX.Element => {
  const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available
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

  return (
    <YextFilters filtersTitle={title} resultsCount={resultCount}>
      <Checkboxes>
        {filters.map((filter, index) => (
          <Checkbox
            id={filter.id}
            label={filter.label}
            name={filter.name}
            value={filter.value}
            key={index}
          ></Checkbox>
        ))}
      </Checkboxes>
    </YextFilters>
  );
};

export default YextResultCardArticlesAdaptor;
