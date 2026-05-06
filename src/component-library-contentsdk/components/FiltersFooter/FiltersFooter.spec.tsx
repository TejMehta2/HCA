import React from 'react';
import { render } from '@testing-library/react';
import FiltersFooter from './FiltersFooter';
import { FiltersFooterProps } from './FiltersFooter.types';

const mockProps: FiltersFooterProps = {
  resultsCount: 20,
};

describe('FiltersFooter', () => {
  it('Renders count from props', async () => {
    const { getByText } = render(<FiltersFooter {...mockProps} />);
    expect(getByText('See 20 Results')).toBeVisible();
  });
});
