import React from 'react';
import SearchFormLoadMore from './SearchFormLoadMore';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchFormLoadMore> = {
  title: 'yext/SearchFormLoadMore',
  component: SearchFormLoadMore,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof SearchFormLoadMore> = {
  args: {
    defaultLimit: 2,
    limit: 2,
    resultsCount: 8,
    children: (
      <>
        <span>
          <Icons iconName={'iconPlus'} />
        </span>
        <span>Show more</span>
      </>
    ),
  },
};
