import React from 'react';
import { render } from '@testing-library/react';
import BlogFilterList from './BlogFilterList';
import { BlogFilterListProps } from './BlogFilterList.types';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const filters = [
  'Orthopaedic care',
  'Orthopaedic care',
  'Orthopaedic care',
  'Orthopaedic care',
  'Orthopaedic care',
];

const clearFilters = () => {
  console.log('clear one or all filters');
};

const mockProps: BlogFilterListProps = {
  filters: (
    <>
      {filters.map((filter, index) => (
        <Button key={index} size={'small'} theme={'full-light-blue'}>
          <button onClick={clearFilters}>
            <span>{filter}</span>
            <Icons iconName="iconCrossSmall" />
          </button>
        </Button>
      ))}
    </>
  ),
  clearFilters: clearFilters,
};

describe('BlogFilterList', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<BlogFilterList {...mockProps} />);
    expect(getByText('Orthopaedic care')).toBeVisible();
  });
});
