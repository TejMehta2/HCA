import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';
import SearchBar from './SearchBar';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchBar> = {
  title: 'components/SearchBar',
  component: SearchBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'J-HCA-Tangerine-20'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Placeholder text...',
  },
};

export const WithDefaultValue: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Start typing...',
    defaultValue: 'Default value',
  },
};

export const WithSuggestions: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Start typing...',
    suggestions: ['Suggestion A', 'Suggestion B', 'Suggestion C'],
  },
};

export const WithChildren: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Start typing...',
    defaultValue: 'Suggestion',
    children: (
      <>
        <Button size={'large'} variation={'full'}>
          <button type="button">
            <span>Filters</span>
          </button>
        </Button>
        <Button size={'large'} variation={'outline'}>
          <button type="button">
            <span>Sort by</span>
          </button>
        </Button>
      </>
    ),
  },
};
