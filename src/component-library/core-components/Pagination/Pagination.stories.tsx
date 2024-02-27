import React from 'react';
import Pagination from './Pagination';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Pagination> = {
  title: 'core-components/Pagination',
  component: Pagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

/* Mock callback function for fetching data (Will be API on sitecore integration) */
const getPageContent = (page: number) => console.log(page);

export const Default: StoryObj<typeof Pagination> = {
  args: {
    pageCount: 14,
    callback: (newPage: number) => {
      return getPageContent(newPage);
    },
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};
