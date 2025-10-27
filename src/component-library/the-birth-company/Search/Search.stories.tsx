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
      title: 'Fertility',
      scans: [
        {
          id: '1',
          name: 'Hip Replacement',
          extras: [
            {
              duration: '10',
              id: 'targetItem0',
              price: '60',
              name: 'Blood Test',
            },
            {
              duration: '10',
              id: 'targetItem1',
              price: '60',
              name: 'Blood Test',
            },
          ],
        },
      ],
    },
    {
      title: 'Gynaecology',
      scans: [
        {
          id: '2',
          name: 'Hip Replacement',
          extras: [
            {
              duration: '10',
              id: 'targetItem0',
              price: '60',
              name: 'Blood Test',
            },
            {
              duration: '10',
              id: 'targetItem1',
              price: '60',
              name: 'Blood Test',
            },
          ],
        },
      ],
    },
  ],
  dropdownColumn2List: [
    {
      scans: [
        {
          id: '1',
          name: 'Anatomy Scan',
          extras: [
            {
              duration: '10',
              id: 'targetItem0',
              price: '60',
              name: 'Blood Test',
            },
            {
              duration: '10',
              id: 'targetItem1',
              price: '60',
              name: 'Blood Test',
            },
          ],
        },
      ],
    },
  ],
};
