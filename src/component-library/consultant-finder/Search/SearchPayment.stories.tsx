import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchPayment from './SearchPayment';
import SearchProps from './Search.types';

// Define the Meta for the component
const meta: Meta<SearchProps> = {
  title: 'consultant-finder/Search',
  component: SearchPayment,
};

export default meta;
// test

export const Payment: StoryObj<SearchProps> = (
  args: React.JSX.IntrinsicAttributes & SearchProps
) => {
  const [searchStringPayment, setSearchStringPayment] = React.useState('');

  return (
    <SearchPayment
      {...args}
      searchStringPayment={searchStringPayment}
      setSearchStringPayment={setSearchStringPayment}
    />
  );
};

// Define default args for the story
Payment.args = {
  placeholder: 'Type in your insurance provider',
  doctifyBaseURL: 'https://api.doctify.com/api/hca/listing/insurers',
  limit: 20,
  noResultsMsg: 'No matches found, please try typing something else.',
  insuranceProvidersFilterHeaderText: 'INSURERS',
  loadingText: 'Loading...',
  insurersList: [
    {
      id: 'bd931ca2-edcf-43b7-bdca-fca3c8b47722',
      url: '/Finder/Step-Payment/Data/StepPaymentData/FilterOptions/AETNA',
      name: 'AETNA',
      displayName: 'AETNA',
      fields: {
        id: {
          value: 26,
        },
        name: {
          value: 'Aetna',
        },
        type: {
          value: 'Insurance',
        },
        Value: {
          value: 'Aetna',
        },
        Key: {
          value: 'AETNA',
        },
        Order: {
          value: 1,
        },
      },
    },
    {
      id: '6a5dca57-1ab4-41ec-afde-0554b9866686',
      url: '/Finder/Step-Payment/Data/StepPaymentData/FilterOptions/ALLIANZ',
      name: 'ALLIANZ',
      displayName: 'ALLIANZ',
      fields: {
        id: {
          value: 16,
        },
        name: {
          value: 'Allianz Worldwide Care',
        },
        type: {
          value: 'Insurance',
        },
        Value: {
          value: 'Allianz',
        },
        Key: {
          value: 'ALLIANZ',
        },
        Order: {
          value: 2,
        },
      },
    },
    {
      id: 'f1dd29d6-d71c-47fe-b2c9-c41ab7f94489',
      url: '/Finder/Step-Payment/Data/StepPaymentData/FilterOptions/AVIVA',
      name: 'AVIVA',
      displayName: 'AVIVA',
      fields: {
        id: {
          value: 19,
        },
        name: {
          value: 'Aviva Health',
        },
        type: {
          value: 'Insurance',
        },
        Value: {
          value: 'Aviva',
        },
        Key: {
          value: 'AVIVA',
        },
        Order: {
          value: 3,
        },
      },
    },
    {
      id: '3b4079b7-893a-477a-a59c-3e6701e47122',
      url: '/Finder/Step-Payment/Data/StepPaymentData/FilterOptions/BUPA-UK',
      name: 'BUPA-UK',
      displayName: 'BUPA-UK',
      fields: {
        id: {
          value: 14,
        },
        name: {
          value: 'Bupa',
        },
        type: {
          value: 'Insurance',
        },
        Value: {
          value: 'Bupa UK',
        },
        Key: {
          value: 'BUPA-UK',
        },
        Order: {
          value: 5,
        },
      },
    },
    {
      id: 'edbd0d28-2b76-404a-a68d-8ceb6c99d4ff',
      url: '/Finder/Step-Payment/Data/StepPaymentData/FilterOptions/PPP-AXA',
      name: 'PPP AXA',
      displayName: 'PPP AXA',
      fields: {
        id: {
          value: 18,
        },
        name: {
          value: 'AXA PPP Healthcare',
        },
        type: {
          value: 'Insurance',
        },
        Value: {
          value: 'AXA UK',
        },
        Key: {
          value: 'PPP AXA',
        },
        Order: {
          value: 4,
        },
      },
    },
  ],
};
