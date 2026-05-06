import React from 'react';
import HomepageHeroOverlap from './HomepageHeroOverlap';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HomepageHeroOverlap> = {
  title: 'poc/HomepageHeroOverlap',
  component: HomepageHeroOverlap,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HomepageHeroOverlap> = {
  args: {
    children: <p>HomepageHeroOverlap</p>,
  },
};
