import React from 'react';
import { render, act } from '@testing-library/react';
import Pagination from './Pagination';
import { PaginationProps } from './Pagination.types';

const mockProps: PaginationProps = {
  pageCount: 14,
  callback: (newPage: number) => console.log(newPage),
};

describe('Pagination', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Pagination {...mockProps} />);
    expect(getByText('1')).toBeVisible();
  });

  it('Calls the callback function with the new page number', async () => {
    let pageNumber = 0;
    const callback = (newPage: number) => {
      pageNumber = newPage;
      return console.log(newPage);
    };
    const { getByText } = render(
      <Pagination {...mockProps} callback={callback} />
    );

    await act(async () => {
      await getByText('2').click(); // Click the second page
    });

    await expect(pageNumber).toBe(2);
  });

  it('Does not call the callback function when the current page number is clicked', async () => {
    let pageNumber = 0;
    const callback = (newPage: number) => {
      pageNumber = newPage;
      return console.log(newPage);
    };
    const { getByText } = render(
      <Pagination {...mockProps} callback={callback} />
    );
    await act(async () => {
      await getByText('1').click();
    });

    await expect(pageNumber).not.toBe(1);
  });
});
