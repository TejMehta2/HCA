import React from 'react';
import { render } from '@testing-library/react';
import Pagination from './Pagination';
import { PaginationProps } from './Pagination.types';

const mockProps: PaginationProps = {
  children: <p>Hello world</p>,
};

describe('Pagination', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Pagination {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
