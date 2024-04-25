import React from 'react';
import { render } from '@testing-library/react';
import YextFilters from './YextFilters';
import { YextFiltersProps } from './YextFilters.types';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';

const mockProps: YextFiltersProps = {
  filtersTitle: 'Tests, Scans, Treatments',
  children: (
    <Checkboxes>
      <Checkbox
        id="1"
        label="Conditions (20)"
        name="conditions"
        value="conditions"
      ></Checkbox>

      <Checkbox id="2" label="Tests (15)" name="tests" value="tests"></Checkbox>

      <Checkbox
        id="3"
        label="Treatments (2)"
        name="tests"
        value="tests"
      ></Checkbox>
    </Checkboxes>
  ),
  resultsCount: 20,
};

describe('YextFilters', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextFilters {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
