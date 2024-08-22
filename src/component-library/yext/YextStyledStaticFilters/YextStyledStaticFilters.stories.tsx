import React from 'react';
import Themes from '../../foundation/Themes/Themes';
import YextStyledStaticFilters from './YextStyledStaticFilters';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextStyledStaticFilters> = {
  title: 'yext/YextStyledStaticFilters',
  component: YextStyledStaticFilters,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextStyledStaticFilters> = {
  args: {
    fieldId: 'location',
    filterOptions: [
      { value: 'Option a' },
      { value: 'Option b' },
      { value: 'Option c' },
      { value: 'Option d' },
      { value: 'Option e' },
      { value: 'Option f' },
      { value: 'Option g' },
      { value: 'Option h' },
      { value: 'Option i' },
    ],
    title: 'Select a location',
  },
  decorators: [
    (Story) => (
      <Themes theme="D-HCA-Teal">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
