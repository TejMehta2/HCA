import React, { ChangeEvent } from 'react';
import { render } from '@testing-library/react';
import Sorting from './Sorting';
import { SortingProps } from './Sorting.types';

const mockProps: SortingProps = {
  options: [
    {
      id: 'option-a',
      defaultChecked: true,
      labelText: 'Alphabetically (A to Z)',
    },
    {
      id: 'option-b',
      labelText: 'Alphabetically (Z to A)',
    },
    { id: 'option-c', labelText: 'Price (Low to High)' },
    {
      id: 'option-d',
      labelText: 'Price (High to Low)',
    },
  ],
  onChange: () => {},
};

jest.mock('next-localization', () => ({
  useI18n: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('Sorting', () => {
  it('Applies defaultChecked from prop', async () => {
    const { getAllByRole } = render(<Sorting {...mockProps} />);
    expect(getAllByRole('radio')[0]).toBeChecked(); //
    expect(getAllByRole('radio')[1]).not.toBeChecked();
  });
  it('Calls the onChange prop', async () => {
    let returnedName = '';
    let returnedId = '';
    const callback = (event: ChangeEvent<HTMLInputElement>) => {
      returnedName = event.target.name;
      returnedId = event.target.id;
    };
    const { getAllByRole } = render(
      <Sorting {...mockProps} onChange={callback} />
    );
    getAllByRole('radio')[0].click(); // select second radio
    expect(returnedName === mockProps.options[1].labelText);
    expect(returnedId === mockProps.options[1].id);
  });
});
