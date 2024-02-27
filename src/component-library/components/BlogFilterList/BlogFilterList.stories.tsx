import React from 'react';
import BlogFilterList from './BlogFilterList';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BlogFilterList> = {
  title: 'components/BlogFilterList',
  component: BlogFilterList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

const filters = [
  'Orthopaedic care',
  'Orthopaedic care',
  'Orthopaedic care',
  'Orthopaedic care',
  'Orthopaedic care',
];

const clearFilters = (index: number) => {
  if (index === undefined) {
    console.log('clear all filters');
    return;
  }
  console.log('clear filter ' + index);
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof BlogFilterList> = {
  args: {
    filters: filters,
    clearFilters: clearFilters,
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
