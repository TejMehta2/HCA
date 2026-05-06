import React from 'react';
import ModalCallUs from './ModalCallUs';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ModalCallUs> = {
  title: 'components/ModalCallUs',
  component: ModalCallUs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const contacts = [
  {
    title: <span>General enquiries & Appointments</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday to Friday 8am - 6pm</span>,
  },
  {
    title: <span>media & Press</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday to Friday 8am - 6pm</span>,
  },
  {
    title: <span>feedback & Complaints</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday to Friday 8am - 6pm</span>,
  },
  {
    title: <span>customer service</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday to Friday 8am - 6pm</span>,
  },
  {
    title: <span>media</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday 6pm</span>,
  },
  {
    title: <span>feedback & Complaints</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday to Friday 8am - 6pm</span>,
  },
  {
    title: <span>media</span>,
    phone: { text: '020 3131 5978', number: '020 3131 5978' },
    availability: <span>Monday 6pm</span>,
  },
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 4),
  },
};

export const OneNumber: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 1),
  },
};

export const TwoNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 2),
  },
};

export const ThreeNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 3),
  },
};

export const FourNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 4),
  },
};

export const FiveNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 5),
  },
};

export const SixNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 6),
  },
};

export const SevenNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: contacts.slice(0, 7),
  },
};

export const EqualSizeNumbers: StoryObj<typeof ModalCallUs> = {
  args: {
    defaultOpen: true,
    contacts: [
      {
        title: <span>london clinic</span>,
        phone: { text: '020 3131 5978', number: '020 3131 5978' },
        availability: (
          <span>
            Mon & Thu: 8am-8pm
            <br />
            Tue, Wed & Fri: 8am-6pm
            <br />
            Sat: 9am-4pm
            <br />
            Sun: 10am-2pm
          </span>
        ),
      },
      {
        title: <span>Cheshire clinic</span>,
        phone: { text: '020 3131 5978', number: '020 3131 5978' },
        availability: (
          <span>
            Mon & Thu: 8am-8pm
            <br />
            Tue, Wed & Fri: 8am-6pm
          </span>
        ),
      },
    ],
    contentVariation: 'EqualSizeNumbers',
  },
};
