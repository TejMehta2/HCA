//import React from 'react';
import ProgressBar from './ProgressBar';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProgressBar> = {
  title: 'the-birth-company/ProgressBar',
  component: ProgressBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const dummySteps = [
  {
    id: 'a376afaa-c05d-435b-9bd3-5957ec011c6c',
    url: '/booking/data/progressbarsteps/steplocation_selected',
    name: 'StepLocation_Selected',
    displayName: 'StepLocation_Selected',
    fields: {
      Link: {
        value: {
          class: '',
          id: '{7B1A36FD-8597-4118-91F6-880438CE616D}',
          querystring: '',
          anchor: '',
          target: '|Custom',
          title: '',
          linktype: 'internal',
          text: '',
          url: '/HCA/HCA-Main/Home/Booking/Location',
          href: '/booking/location',
        },
      },
      Order: {
        value: 1,
      },
      Selected: {
        value: true,
      },
      StepText: {
        value: 'Location',
      },
    },
  },
  {
    id: '677ae50f-26c5-4470-8ad2-ba4b57aca6ca',
    url: '/booking/data/progressbarsteps/steptype',
    name: 'StepType',
    displayName: 'StepType',
    fields: {
      Link: {
        value: {
          text: '',
          anchor: '',
          linktype: 'internal',
          class: '',
          title: '',
          target: '|Custom',
          querystring: '',
          id: '{A0E23043-DC08-4723-8011-A512F17C529E}',
          href: '/booking/type',
        },
      },
      Order: {
        value: 2,
      },
      Selected: {
        value: false,
      },
      StepText: {
        value: 'Type',
      },
    },
  },
  {
    id: '6e62cabd-95e9-43b7-9b82-01b4e927e362',
    url: '/booking/data/progressbarsteps/stepslot',
    name: 'StepSlot',
    displayName: 'StepSlot',
    fields: {
      Link: {
        value: {
          text: '',
          anchor: '',
          linktype: 'internal',
          class: '',
          title: '',
          target: '|Custom',
          querystring: '',
          id: '{31E47561-37E0-40D6-87F0-B280B4792717}',
          href: '/booking/slot',
        },
      },
      Order: {
        value: 3,
      },
      Selected: {
        value: false,
      },
      StepText: {
        value: 'Slot',
      },
    },
  },
  {
    id: '75d1a423-4136-4ef3-9baf-f50fda47199c',
    url: '/booking/data/progressbarsteps/stepdetails',
    name: 'StepDetails',
    displayName: 'StepDetails',
    fields: {
      Link: {
        value: {
          text: '',
          anchor: '',
          linktype: 'internal',
          class: '',
          title: '',
          target: '|Custom',
          querystring: '',
          id: '{2391B7F0-EFBF-4696-9647-E19394A25605}',
          href: '/booking/details',
        },
      },
      Order: {
        value: 4,
      },
      Selected: {
        value: false,
      },
      StepText: {
        value: 'Details',
      },
    },
  },
  {
    id: '0a7bf3ec-6be1-4344-a8c9-e5baed6dad3b',
    url: '/booking/data/progressbarsteps/steppayment',
    name: 'StepPayment',
    displayName: 'StepPayment',
    fields: {
      Link: {
        value: {
          href: '',
        },
      },
      Order: {
        value: 5,
      },
      Selected: {
        value: false,
      },
      StepText: {
        value: 'Payment',
      },
    },
  },
  {
    id: '15778cc8-0712-45f1-9525-b29bcf28a4fc',
    url: '/booking/data/progressbarsteps/stepconfirmation',
    name: 'StepConfirmation',
    displayName: 'StepConfirmation',
    fields: {
      Link: {
        value: {
          text: '',
          anchor: '',
          linktype: 'internal',
          class: '',
          title: '',
          target: '|Custom',
          querystring: '',
          id: '{6F502522-C278-4D3E-8B03-18266AD2B473}',
          href: '/booking/confirmation',
        },
      },
      Order: {
        value: 6,
      },
      Selected: {
        value: false,
      },
      StepText: {
        value: 'Confirmation',
      },
    },
  },
];

export const Default: StoryObj<typeof ProgressBar> = {
  args: {
    currentPage: '1',
    steps: dummySteps,
  },
};
