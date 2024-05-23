import React from 'react';
import PaymentFormHeader from './PaymentFormHeader';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PaymentFormHeader> = {
  title: 'site-components/PaymentFormHeader',
  component: PaymentFormHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof PaymentFormHeader> = {
  args: {
    paymentsText: 'Secure Online Payments',
    contactText: 'Any questions?',
    phoneNumber: {
      icon: <Icons iconName="iconPhone" />,
      text: '03332 223 133',
      number: '03332223133',
    },
    openingHours: {
      icon: <Icons iconName="iconClock" />,
      text: 'Mon-Fri 9am-5:30pm; Sat-Sun 9am-2pm',
    },
  },
};
