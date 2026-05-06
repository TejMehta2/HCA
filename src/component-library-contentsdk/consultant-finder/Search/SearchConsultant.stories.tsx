import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchConsultant from './SearchConsultant';
import SearchProps from './Search.types';

// Define the Meta for the component
const meta: Meta<SearchProps> = {
  title: 'consultant-finder/Search',
  component: SearchConsultant,
};

export default meta;

export const Consultant: StoryObj<SearchProps> = (
  args: React.JSX.IntrinsicAttributes & SearchProps
) => {
  const [searchStringConsultantName, setSearchStringConsultantName] =
    React.useState('');

  return (
    <SearchConsultant
      {...args}
      searchStringConsultantName={searchStringConsultantName}
      setSearchStringConsultantName={setSearchStringConsultantName}
    />
  );
};

// Define default args for the story
Consultant.args = {
  placeholder: 'Type in a consultant name',
  doctifyBaseURL: 'https://api.doctify.com/api/hca/search/autocomplete?search',
  doctifySearchBaseURL: 'https://api.doctify.com/api/hca/search',
  limit: 20,
  noResultsMsg: 'No matches found, please try typing something else.',
  popularConsultantsList: [
    {
      id: '776af934-062e-47ca-b015-6b9e63e2920c',
      url: '/Finder/Step-Search-Consultant/Data/StepSearchConsultantData/PopularSearchesConsultants/mr-andrew-goldberg',
      name: 'mr-andrew-goldberg',
      displayName: 'mr-andrew-goldberg',
      fields: {
        id: {
          value: 6254,
        },
        firstName: {
          value: 'Andrew',
        },
        lastName: {
          value: 'Goldberg OBE',
        },
        slug: {
          value: 'mr-andrew-goldberg',
        },
        specialty: {
          value: 'Orthopaedic Surgery',
        },
        suffix: {
          value: 'MD MBBS FRCS FRCSI FRCS(Tr&Orth)',
        },
        title: {
          value: 'Mr',
        },
        Order: {
          value: 1,
        },
        Type: {
          value: 'Consultant',
        },
        Value: {
          value: 'Mr Andrew Goldberg OBE',
        },
        Key: {
          value: 'mr-andrew-goldberg',
        },
      },
    },
    {
      id: '27ddeea3-0636-4332-9541-07b4c9f740c5',
      url: '/Finder/Step-Search-Consultant/Data/StepSearchConsultantData/PopularSearchesConsultants/mr-sam-singh',
      name: 'mr-sam-singh',
      displayName: 'mr-sam-singh',
      fields: {
        id: {
          value: 7384,
        },
        firstName: {
          value: 'Sam',
        },
        lastName: {
          value: 'Singh',
        },
        slug: {
          value: 'mr-sam-singh',
        },
        specialty: {
          value: 'Orthopaedic Surgery',
        },
        suffix: {
          value: 'MA MRCS FRCS(Orth)',
        },
        title: {
          value: 'Mr',
        },
        Order: {
          value: 2,
        },
        Type: {
          value: 'Consultant',
        },
        Value: {
          value: 'Mr Sam Singh',
        },
        Key: {
          value: 'mr-sam-singh',
        },
      },
    },
    {
      id: '53ce99ec-f8e2-4672-afcf-6b47191b957f',
      url: '/Finder/Step-Search-Consultant/Data/StepSearchConsultantData/PopularSearchesConsultants/mr-christian-brown',
      name: 'mr-christian-brown',
      displayName: 'mr-christian-brown',
      fields: {
        id: {
          value: 262,
        },
        firstName: {
          value: 'Christian',
        },
        lastName: {
          value: 'Brown',
        },
        slug: {
          value: 'mr-christian-brown',
        },
        specialty: {
          value: 'Urology',
        },
        suffix: {
          value: 'BSc MD FRCS (Urol)',
        },
        title: {
          value: 'Mr',
        },
        Order: {
          value: 3,
        },
        Type: {
          value: 'Consultant',
        },
        Value: {
          value: 'Mr Christian Brown',
        },
        Key: {
          value: 'mr-christian-brown',
        },
      },
    },
    {
      id: 'c812cbe2-ad49-4ba3-bd5e-d9d8a5434844',
      url: '/Finder/Step-Search-Consultant/Data/StepSearchConsultantData/PopularSearchesConsultants/dr-ajai-seth',
      name: 'dr-ajai-seth',
      displayName: 'dr-ajai-seth',
      fields: {
        id: {
          value: 2988,
        },
        firstName: {
          value: 'Ajai',
        },
        lastName: {
          value: 'Seth',
        },
        slug: {
          value: 'dr-ajai-seth',
        },
        specialty: {
          value: 'Sports & Exercise Medicine',
        },
        suffix: {
          value: 'MBBS BSc MSc MRCS MRCGP FFSEM',
        },
        title: {
          value: 'Dr',
        },
        Order: {
          value: 4,
        },
        Type: {
          value: 'Consultant',
        },
        Value: {
          value: 'Dr Ajai Seth',
        },
        Key: {
          value: 'dr-ajai-seth',
        },
      },
    },
    {
      id: '7ea6a97e-8544-4895-8a33-f94e9ae14be9',
      url: '/Finder/Step-Search-Consultant/Data/StepSearchConsultantData/PopularSearchesConsultants/dr-nisith-sheth',
      name: 'dr-nisith-sheth',
      displayName: 'dr-nisith-sheth',
      fields: {
        id: {
          value: 3870,
        },
        firstName: {
          value: 'Nisith',
        },
        lastName: {
          value: 'Sheth',
        },
        slug: {
          value: 'dr-nisith-sheth',
        },
        specialty: {
          value: 'Dermatology',
        },
        suffix: {
          value: 'MBBS, FRCP(UK), CCST(Derm)',
        },
        title: {
          value: 'Dr',
        },
        Order: {
          value: 5,
        },
        Type: {
          value: 'Consultant',
        },
        Value: {
          value: 'Dr Nisith Sheth',
        },
        Key: {
          value: 'dr-nisith-sheth',
        },
      },
    },
  ],
  searchConsultantsResultsHeaderText: 'SPECIALISTS',
  loadingText: 'Loading...',
};
