import React from 'react';
import { render } from '@testing-library/react';
import Filters from './Filters';
import { FiltersProps } from './Filters.types';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import Checkbox from '../../core-components/Checkbox/Checkbox';

const mockProps: FiltersProps = {
  resultsCount: 10,
  filters: [
    {
      title: 'Locations',
      children: (
        <Checkboxes>
          <Checkbox
            id="1"
            value="Christie"
            name="locations"
            label="Christie Hospital"
          ></Checkbox>
          <Checkbox
            id="2"
            value="london-bridge"
            name="locations"
            label="London Bridge Hospital"
          ></Checkbox>
        </Checkboxes>
      ),
    },
  ],
};

describe('Filters', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Filters {...mockProps} />);
    expect(getByText('Locations')).toBeVisible();
  });
});
