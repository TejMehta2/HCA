import React from 'react';
import Reviews from './Reviews';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Reviews> = {
  title: 'consultant-finder/Reviews',
  component: Reviews,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

const tooltipContent = (
  <div>
    <p>This is a tooltip content.</p>
  </div>
);

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Reviews> = {
  args: {
    reviewsTotal: 35,
    reviewsCount: 4.5,
    reviewsText: 'Patients',
    noReviewsMsg: 'This consultant does not have any reviews at the moment.',
    isConsultantProfileReviews: true,
    hasTooltip: true,
    tooltipContent: tooltipContent,
    titleText: 'Patient rating',
    doctifyLogo: null,
    doctifyText: 'Verified by',
    hasDoctifyBranding: true,
  },
};
