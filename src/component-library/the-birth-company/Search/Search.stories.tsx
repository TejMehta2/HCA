import React from 'react';
import Search from './Search';
import type { Meta, StoryObj } from '@storybook/react';
import SearchProps from './Search.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Search> = {
  title: 'the-birth-company/Search',
  component: Search,
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<SearchProps> = (
  args: React.JSX.IntrinsicAttributes & SearchProps
) => {
  return <Search {...args} />;
};

// Define default args for the story
Default.args = {
  placeholder: 'Type in a scan or test...',
  dropdownColumn1Label: 'Gynaecological scans',
  dropdownColumn2Label: 'Pregnancy scans',
  dropdownColumn1List: [
    {
      id: '1',
      serviceName: { value: 'Hip Replacement' },
      extras: {
        targetItems: {
          0: {
            duration: { value: '10' },
            id: 'targetItem0',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
          1: {
            duration: { value: '10' },
            id: 'targetItem1',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
        },
      },
    },
    {
      id: '2',
      serviceName: { value: 'Hip Replacement' },
      extras: {
        targetItems: {
          0: {
            duration: { value: '10' },
            id: 'targetItem0',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
          1: {
            duration: { value: '10' },
            id: 'targetItem1',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
        },
      },
    },
  ],
  dropdownColumn2List: [
    {
      id: '1',
      serviceName: { value: 'Anatomy Scan' },
      extras: {
        targetItems: {
          0: {
            duration: { value: '10' },
            id: 'targetItem0',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
          1: {
            duration: { value: '10' },
            id: 'targetItem1',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
        },
      },
    },
  ],
};
