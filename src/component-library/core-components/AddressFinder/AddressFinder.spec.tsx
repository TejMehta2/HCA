import React from 'react';
import { render } from '@testing-library/react';
import AddressFinder from './AddressFinder';
import { AddressFinderProps } from './AddressFinder.types';

const mockProps: AddressFinderProps = {
  children: <p>Hello world</p>,
};

describe('AddressFinder', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<AddressFinder {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
