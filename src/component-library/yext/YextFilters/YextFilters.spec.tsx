import React from 'react';
import { render } from '@testing-library/react';
import YextFilters from './YextFilters';
import { YextFiltersProps } from './YextFilters.types';

const mockProps: YextFiltersProps = {
  children: <p>Hello world</p>,
};

describe('YextFilters', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextFilters {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
