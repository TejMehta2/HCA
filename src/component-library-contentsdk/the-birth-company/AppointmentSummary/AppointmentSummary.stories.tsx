import AppointmentSummary from './AppointmentSummary';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppointmentSummary> = {
  title: 'the-birth-company/AppointmentSummary',
  component: AppointmentSummary,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof AppointmentSummary> = {
  args: {
    title: 'Appointment summary',
    locationTitle: 'Location',
    location: 'London',
    appointmentTitle: 'Appointment',
    appointment: 'With Sonographer',
    dateTitle: 'Date & time',
    date: 'Friday 04 Nov at 10:30am (30 min)',
    priceTitle: 'Price to pay',
    price: '£340',
  },
};
