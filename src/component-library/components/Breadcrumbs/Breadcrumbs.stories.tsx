import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Breadcrumbs> = {
  title: 'components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Breadcrumbs> = {
  args: {
    children: [
      <a href="#" key={1}>
        Services & Treatments
      </a>,
      <a href="#" key={2}>
        Services & Treatments
      </a>,
      <a href="#" key={3}>
        Services & Treatments
      </a>,
      <span key={4}>Service Lines</span>,
    ],
  },
};
