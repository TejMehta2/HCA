import React, { useState, FormEvent, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AddressFinder from './AddressFinder';
import Button from '../Button/Button';
import Themes from '../../foundation/Themes/Themes';
import { addressResult } from './AddressFinder.types';

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

const meta: Meta<typeof AddressFinder> = {
  title: 'core-components/AddressFinder',
  component: AddressFinder,
};

export default meta;
type Story = StoryObj<typeof AddressFinder>;

const AddressFinderWithHooks = () => {
  const [results, setResults] = useState<addressResult[]>([]);
  const [showAddressErrors, setShowAddressErrors] = useState(false);
  const [term, setTerm] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState('');

  const dummySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAddressErrors(false);
    if (submittedAddress.length) {
      alert(submittedAddress);
    } else {
      setShowAddressErrors(true);
    }
  };

  useEffect(() => {
    if (term) {
      setResults(mockResults);
    }
  }, [term]);

  useEffect(() => {
    if (submittedAddress.length) {
      setShowAddressErrors(false);
    }
  }, [submittedAddress]);

  return (
    <>
      <Themes theme="A-HCA-White">
        <form
          onSubmit={dummySubmit}
          style={{ width: 700, margin: 'auto', padding: '2rem' }}
          noValidate={true}
        >
          <AddressFinder
            addressResults={results}
            searchAddress={(term) => {
              setTerm(term);
              setResults([]);
            }}
            chosenAddress={(address) => {
              const { line1 } = address;
              setSubmittedAddress(`${line1}`);
            }}
            displayErrors={showAddressErrors}
            errors={(error) => {
              setShowAddressErrors(error);
            }}
          />
          <div style={{ paddingTop: '2rem' }}>
            <Button variation="full" size="large">
              <button type="submit">Submit</button>
            </Button>
          </div>
        </form>
      </Themes>
    </>
  );
};

export const Default: Story = {
  render: () => <AddressFinderWithHooks />,
};
