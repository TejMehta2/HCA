import React from 'react';
import Stats from './Stats';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Stats> = {
  title: 'careers/Stats',
  component: Stats,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Stats> = {
  args: {
    heading: (
      <Text tag={'h2'} variation="display-2">
        At a glance
      </Text>
    ),
    children: (
      <>
        <div>
          <Text variation="display-4">6</Text>
          <Text variation="body-medium-large">leading hospitals</Text>
        </div>
        <div>
          <Text variation="display-4">8,000</Text>
          <Text variation="body-medium-large">UK workforce</Text>
        </div>
        <div>
          <Text variation="display-4">50</Text>
          <Text variation="body-medium-large">years established</Text>
        </div>
        <div>
          <Text variation="display-4">35</Text>
          <Text variation="body-medium-large">
            outpatient and GP facilities
          </Text>
        </div>
        <div>
          <Text variation="display-4">270,000</Text>
          <Text variation="body-medium-large">colleagues worldwide</Text>
        </div>
      </>
    ),
  },
};
