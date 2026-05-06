import React from 'react';
import { render } from '@testing-library/react';
import SearchFilterList from './SearchFilterList';
import { SearchFilterListProps } from './SearchFilterList.types';

const clearFilters = () => {
  console.log('clear all filters');
  return;
};

const mockProps: SearchFilterListProps = {
  filters: [
    {
      label: 'Orthopaedic care 1',
      id: 'care-1',
    },
    {
      label: 'Orthopaedic care 2',
      id: 'care-2',
    },
  ],
  clearFilters,
};

describe('SearchFilterList', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchFilterList {...mockProps} />);
    expect(getByText('Orthopaedic care 1')).toBeVisible();
  });
});
