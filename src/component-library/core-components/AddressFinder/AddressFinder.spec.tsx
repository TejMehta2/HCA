import React from 'react';
import { render } from '@testing-library/react';
import AddressFinder from './AddressFinder';
import { AddressFinderProps } from './AddressFinder.types';

const mockResults = [
  {
    line1: '1 Test Street',
    line2: 'Somewhere',
    city: 'London',
    country: 'UK',
    postcode: 'SE1 1AB',
    id: '1',
  },
  {
    line1: '2 Test Street',
    line2: 'Somewhere',
    city: 'London',
    country: 'UK',
    postcode: 'SE1 1AB',
    id: '2',
  },
  {
    line1: '3 Test Street',
    line2: '',
    city: 'London',
    country: 'UK',
    postcode: 'SE1 1AB',
    id: '3',
  },
];

let submittedAddress = '';
console.log(submittedAddress);

const mockProps: AddressFinderProps = {
  addressResults: mockResults,
  searchAddress: (term) => {
    console.log(term);
  },
  chosenAddress: (address) => {
    const { line1 } = address;
    submittedAddress = `${line1}`;
  },
};

describe('AddressFinder', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<AddressFinder {...mockProps} />);
    expect(getByText('Enter your address manually')).toBeVisible();
  });
});
