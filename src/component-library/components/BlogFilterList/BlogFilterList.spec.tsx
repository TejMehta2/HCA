import React from 'react';
import { render } from '@testing-library/react';
import BlogFilterList from './BlogFilterList';
import { BlogFilterListProps } from './BlogFilterList.types';

const filters = ['Orthopaedic care'];

const clearFilters = (index: number) => {
  if (index === undefined) {
    console.log('clear all filters');
    return;
  }
  console.log('clear filter ' + index);
};

const mockProps: BlogFilterListProps = {
  filters: filters,
  clearFilters: clearFilters,
};

describe('BlogFilterList', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<BlogFilterList {...mockProps} />);
    expect(getByText('Orthopaedic care')).toBeVisible();
  });
});
