import React from 'react';
import { render } from '@testing-library/react';
import SearchFormPagination from './SearchFormPagination';
import { SearchFormPaginationProps } from './SearchFormPagination.types';

const mockProps: SearchFormPaginationProps = {
  offset: 0,
  limit: 2,
  resultsCount: 4,
};

describe('SearchFormPagination', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchFormPagination {...mockProps} />);
    expect(getByText('1')).toBeVisible();
  });
});
