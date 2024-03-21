import Themes from '../../foundation/Themes/Themes';
import Filters from '../../site-components/Filters/Filters';
import SearchFilterList from '../SearchFilterList/SearchFilterList';
import Sorting from '../Sorting/Sorting';
import SearchBar from './SearchBar';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchBar> = {
  title: 'components/SearchBar',
  component: SearchBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Themes theme={'J-HCA-Tangerine-20'}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
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
    placeholder: 'Placeholder text...',
    defaultValue: 'Default value',
  },
};

export const WithSuggestions: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Placeholder text...',
    suggestions: ['Suggestion A', 'Suggestion B', 'Suggestion C'],
    defaultValue: 'Default value',
  },
};

export const WithSorting: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Placeholder text...',
    defaultValue: 'Suggestion',
    children: (
      <>
        <Sorting options={[]} />
      </>
    ),
  },
};

export const WithFilters: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Placeholder text...',
    defaultValue: 'Suggestion',
    children: (
      <>
        <Filters resultsCount={0} />
      </>
    ),
  },
};

export const WithSortAndFilters: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Placeholder text...',
    defaultValue: 'Suggestion',
    children: (
      <>
        <Filters resultsCount={0} />
        <Sorting options={[]} />
      </>
    ),
  },
};

export const WithActiveFilters: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Placeholder text...',
    defaultValue: 'Suggestion',
    children: (
      <>
        <Filters resultsCount={0} />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme={'J-HCA-Tangerine-20'}>
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
          }}
        >
          <Story />
          <SearchFilterList
            filters={[
              {
                id: '1',
                label: 'Filter 1',
              },
              {
                id: '2',
                label: 'Filter 2',
              },
            ]}
            clearFilters={() => {}}
          />
        </div>
      </Themes>
    ),
  ],
};
