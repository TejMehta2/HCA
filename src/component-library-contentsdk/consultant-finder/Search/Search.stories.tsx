import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Search from './Search';

// Import the type for your component props
import SearchProps from './Search.types';

// Define the Meta for the component
const meta: Meta<SearchProps> = {
  title: 'consultant-finder/Search',
  component: Search,
};

export default meta;

export const TreatmentConditions: StoryObj<SearchProps> = (
  args: React.JSX.IntrinsicAttributes & SearchProps
) => {
  const [searchString, setSearchString] = React.useState('');

  return (
    <Search
      {...args}
      searchString={searchString}
      setSearchString={setSearchString}
    />
  );
};

// Define default args for the story
TreatmentConditions.args = {
  placeholder: 'Search, conditions, specialty or treatment',
  doctifyBaseURL: 'https://api.doctify.com/api/hca/search/autocomplete?search',
  limit: 20,
  noResultsMsg: 'No matches found, please try typing something else.',
  specialtyLabel: 'Specialties',
  conditionsProceduresLabel: 'Conditions/Procedures',
  loadingText: 'Loading...',
  conditionsTreatmentsList: [
    {
      id: '036f2449-86bb-41d3-a5a1-3ad396c9b27d',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Hip-Replacement',
      name: 'Hip Replacement',
      displayName: 'Hip Replacement',
      fields: {
        id: {
          value: 1140,
        },
        Value: {
          value: 'Hip Replacement',
        },
        Key: {
          value: 'HipReplacement',
        },
        name: {
          value: 'Hip Replacement',
        },
        Order: {
          value: 101,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: 'c990a95c-bee5-4b59-8496-02e28eb05e3f',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Asthma',
      name: 'Asthma',
      displayName: 'Asthma',
      fields: {
        id: {
          value: 1017,
        },
        Value: {
          value: 'Asthma',
        },
        Key: {
          value: 'Asthma',
        },
        name: {
          value: 'Asthma',
        },
        Order: {
          value: 102,
        },
        type: {
          value: 'condition',
        },
      },
    },
    {
      id: '4b7599f9-17a9-4f6e-a501-6579d518607f',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Paediatrics',
      name: 'Paediatrics',
      displayName: 'Paediatrics',
      fields: {
        id: {
          value: 706,
        },
        Value: {
          value: 'Paediatrics (Pediatrics)',
        },
        Key: {
          value: 'PaediatricsSpecialty',
        },
        name: {
          value: 'Paediatrics',
        },
        Order: {
          value: 3,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: 'c66c3baa-2f2b-4329-b161-ebc71c4e1092',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Fertilisation',
      name: 'Fertilisation',
      displayName: 'Fertilisation',
      fields: {
        id: {
          value: 1369,
        },
        Value: {
          value: 'Fertilisation',
        },
        Key: {
          value: 'Fertilisation',
        },
        name: {
          value: 'Fertilisation',
        },
        Order: {
          value: 104,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '495a1ae2-5463-4603-8adf-96e57f18de31',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Anti-reflux-Surgery',
      name: 'Anti-reflux Surgery',
      displayName: 'Anti-reflux Surgery',
      fields: {
        id: {
          value: 1838,
        },
        Value: {
          value: 'Anti-reflux Surgery',
        },
        Key: {
          value: 'AntiRefluxSurgery',
        },
        name: {
          value: 'Anti-reflux Surgery',
        },
        Order: {
          value: 105,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '00df76f2-8a8a-40bc-99ba-75b247b74a83',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Soft-tissue-Therapy-Treatments',
      name: 'Soft-tissue Therapy Treatments',
      displayName: 'Soft-tissue Therapy Treatments',
      fields: {
        id: {
          value: 119,
        },
        Value: {
          value: 'Soft-tissue Therapy Treatments',
        },
        Key: {
          value: 'SoftTissueTherapyTreatments',
        },
        name: {
          value: 'Soft-tissue Therapy Treatments',
        },
        Order: {
          value: 106,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '0d706374-0f19-4284-8914-a52d7739c7f8',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Tendon-Repair-Surgery',
      name: 'Tendon Repair Surgery',
      displayName: 'Tendon Repair Surgery',
      fields: {
        id: {
          value: 210,
        },
        Value: {
          value: 'Tendon Repair Surgery',
        },
        Key: {
          value: 'TendonRepairSurgery',
        },
        name: {
          value: 'Tendon Repair Surgery',
        },
        Order: {
          value: 107,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '18937c7b-9c49-44e7-86aa-43076d9a0ce4',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Knee-Replacement',
      name: 'Knee Replacement',
      displayName: 'Knee Replacement',
      fields: {
        id: {
          value: 1354,
        },
        Value: {
          value: 'Knee Replacement',
        },
        Key: {
          value: 'KneeReplacement',
        },
        name: {
          value: 'Knee Replacement',
        },
        Order: {
          value: 108,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '09611714-0852-41f9-b70c-2a41ce4b9d7c',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Coronary-Angioplasty',
      name: 'Coronary Angioplasty',
      displayName: 'Coronary Angioplasty',
      fields: {
        id: {
          value: 1100,
        },
        Value: {
          value: 'Coronary Angioplasty',
        },
        Key: {
          value: 'CoronaryAngioplasty',
        },
        name: {
          value: 'Coronary Angioplasty',
        },
        Order: {
          value: 109,
        },
        type: {
          value: 'procedure',
        },
      },
    },
  ],
  specialitiesList: [
    {
      id: '52a5bf1d-898c-4fb3-93b5-9190ed54d724',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Dermatology',
      name: 'Dermatology',
      displayName: 'Dermatology',
      fields: {
        id: {
          value: 2924,
        },
        Value: {
          value: 'Dermatology',
        },
        Key: {
          value: 'Dermatology',
        },
        name: {
          value: 'Dermatology',
        },
        Order: {
          value: 1,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: '0e1ee4f0-1520-4736-b3a6-865cda62f66d',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Orthopaedics',
      name: 'Orthopaedics',
      displayName: 'Orthopaedics',
      fields: {
        id: {
          value: 2865,
        },
        Value: {
          value: 'Orthopaedic Surgery',
        },
        Key: {
          value: 'OrthopaedicSurgery',
        },
        name: {
          value: 'Orthopaedics',
        },
        Order: {
          value: 2,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: '4b7599f9-17a9-4f6e-a501-6579d518607f',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Paediatrics',
      name: 'Paediatrics',
      displayName: 'Paediatrics',
      fields: {
        id: {
          value: 706,
        },
        Value: {
          value: 'Paediatrics (Pediatrics)',
        },
        Key: {
          value: 'PaediatricsSpecialty',
        },
        name: {
          value: 'Paediatrics',
        },
        Order: {
          value: 3,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: 'aff18280-1e85-4cff-878c-9ca9abdff6e0',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Fertility',
      name: 'Fertility',
      displayName: 'Fertility',
      fields: {
        id: {
          value: 891,
        },
        Value: {
          value: 'Fertility Medicine',
        },
        Key: {
          value: 'Fertility',
        },
        name: {
          value: 'Fertility',
        },
        Order: {
          value: 4,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: 'ba9445ca-0349-4a40-9dd6-bff7659a3387',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Urology',
      name: 'Urology',
      displayName: 'Urology',
      fields: {
        id: {
          value: 2339,
        },
        Value: {
          value: 'Urology',
        },
        Key: {
          value: 'Urology',
        },
        name: {
          value: 'Urology',
        },
        Order: {
          value: 5,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: 'e675411b-81e2-44b3-a999-9d69e4f30bfb',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Cancer-Care',
      name: 'Cancer Care',
      displayName: 'Cancer Care',
      fields: {
        id: {
          value: null,
        },
        Value: {
          value: 'Cancer Care',
        },
        Key: {
          value: 'CancerCare',
        },
        name: {
          value: '',
        },
        Order: {
          value: 6,
        },
        type: {
          value: '',
        },
      },
    },
    {
      id: '7c85ef8d-e80c-46cd-9733-560e1c7fc1fc',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/General-Surgery',
      name: 'General Surgery',
      displayName: 'General Surgery',
      fields: {
        id: {
          value: 3654,
        },
        Value: {
          value: 'General Surgery',
        },
        Key: {
          value: 'GeneralSurgery',
        },
        name: {
          value: 'General Surgery',
        },
        Order: {
          value: 7,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: '4b205118-cf22-4137-8190-27e9f3d7b714',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Gynaecology',
      name: 'Gynaecology',
      displayName: 'Gynaecology',
      fields: {
        id: {
          value: 2998,
        },
        Value: {
          value: 'Gynaecology',
        },
        Key: {
          value: 'Gynaecology',
        },
        name: {
          value: 'Gynaecology',
        },
        Order: {
          value: 8,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: 'c84bf1de-ff76-4631-9880-9690a2ab0854',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Cardiology',
      name: 'Cardiology',
      displayName: 'Cardiology',
      fields: {
        id: {
          value: 38,
        },
        Value: {
          value: 'Cardiology',
        },
        Key: {
          value: 'Cardiology',
        },
        name: {
          value: 'Cardiology',
        },
        Order: {
          value: 9,
        },
        type: {
          value: 'specialty',
        },
      },
    },
  ],
};
