import React from 'react';
import LocationCardBlock from './LocationCardBlock';
import type { Meta, StoryObj } from '@storybook/react';

import LocationCard from '../../the-birth-company/LocationCard/LocationCard';
import { LocationCardProps } from '../../the-birth-company/LocationCard/LocationCard.types';
import { Default as LocationCardStory } from '../../the-birth-company/LocationCard/LocationCard.stories';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LocationCardBlock> = {
  title: 'the-birth-company/LocationCardBlock',
  component: LocationCardBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof LocationCardBlock> = {
  args: {
    children: (
      <>
        <LocationCard {...(LocationCardStory.args as LocationCardProps)} />
        <LocationCard {...(LocationCardStory.args as LocationCardProps)} />
      </>
    ),
  },
};
