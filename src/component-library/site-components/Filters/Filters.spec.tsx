import React from 'react';
import { render } from '@testing-library/react';
import Filters from './Filters.1';
import { FiltersProps } from './Filters.types';

const mockProps: FiltersProps = {
  children: <p>Hello world</p>,
};

describe('Filters', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Filters {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
