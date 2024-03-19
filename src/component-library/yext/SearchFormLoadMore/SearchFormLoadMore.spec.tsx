import React from 'react';
import { render } from '@testing-library/react';
import SearchFormLoadMore from './SearchFormLoadMore';
import { SearchFormLoadMoreProps } from './SearchFormLoadMore.types';
import Icons from '../../foundation/Icons/Icons';

const mockProps: SearchFormLoadMoreProps = {
  defaultLimit: 2,
  limit: 2,
  resultsCount: 8,
  children: (
    <>
      <span>
        <Icons iconName={'iconPlus'} />
      </span>
      <span>Show more</span>
    </>
  ),
};

describe('SearchFormLoadMore', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchFormLoadMore {...mockProps} />);
    expect(getByText('Show more')).toBeVisible();
  });
});
