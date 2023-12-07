import React from 'react';
import ModalCallUs from './ModalCallUs';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ModalCallUs> = {
  title: 'components/ModalCallUs',
  component: ModalCallUs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: [
      {
        title: <span>General enquiries & Appointments</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>media & Press</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>feedback & Complaints</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>customer service</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
    ],
  },
};
export const OneNumber: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: [
      {
        title: <span>General enquiries & Appointments</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
    ],
  },
};

export const ManyNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: [
      {
        title: <span>General enquiries & Appointments</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>media & Press</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>feedback & Complaints</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>customer service</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
      {
        title: <span>media</span>,
        phone: '3131 5978',
        availability: <span>Monday 6pm</span>,
      },
      {
        title: <span>feedback & Complaints</span>,
        phone: '020 3131 5978',
        availability: <span>Monday to Friday 8am - 6pm</span>,
      },
    ],
  },
};
