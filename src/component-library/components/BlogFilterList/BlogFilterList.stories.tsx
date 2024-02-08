import React from 'react';
import BlogFilterList from './BlogFilterList';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
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

const clearFilters = () => {
  console.log('clear one or all filters');
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof BlogFilterList> = {
  args: {
    filters: (
      <>
        {filters.map((filter, index) => (
          <Button key={index} size="small" theme="full-light-blue">
            <button onClick={clearFilters}>
              <span>{filter}</span>
              <Icons iconName="iconCrossSmall" />
            </button>
          </Button>
        ))}
      </>
    ),
    clearFilters: clearFilters,
  },
  decorators: [
    (Story) => (
      <Themes theme={'F-HCA-White'}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
