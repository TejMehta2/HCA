import React from 'react';
import SearchFilterList from './SearchFilterList';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchFilterList> = {
  title: 'components/SearchFilterList',
  component: SearchFilterList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

const clearFilters = () => {
  console.log('clear all filters');
  return;
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof SearchFilterList> = {
  args: {
    filters: [
      {
        label: 'Orthopaedic care 1',
        id: 'care-1',
      },
      {
        label: 'Orthopaedic care 2',
        id: 'care-2',
      },
    ],
    clearFilters: clearFilters,
  },
  decorators: [
    (Story) => (
      <Themes theme={'J-HCA-Tangerine-20'}>
        <Story />
      </Themes>
    ),
  ],
};
