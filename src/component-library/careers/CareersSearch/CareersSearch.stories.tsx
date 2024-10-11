import React from 'react';
import CareersSearch from './CareersSearch';
import type { Meta, StoryObj } from '@storybook/react';
import YextStyledStaticFilters from '../../yext/YextStyledStaticFilters/YextStyledStaticFilters';
import SearchButton from '../../components/SearchButton/SearchButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CareersSearch> = {
  title: 'careers/CareersSearch',
  component: CareersSearch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CareersSearch> = {
  args: {
    search: (
      <SearchButton onClick={() => {}}>
        <span>
          Search for a <b>keyword or role</b>
        </span>
      </SearchButton>
    ),
    filters: (
      <>
        <YextStyledStaticFilters
          fieldId={'location'}
          filterOptions={[
            { value: 'Option a' },
            { value: 'Option b' },
            { value: 'Option c' },
            { value: 'Option d' },
            { value: 'Option e' },
            { value: 'Option f' },
            { value: 'Option g' },
            { value: 'Option h' },
            { value: 'Option i' },
          ]}
          title={'Select a location'}
        />
        <YextStyledStaticFilters
          fieldId={'area'}
          filterOptions={[
            { value: 'Option 1' },
            { value: 'Option 2' },
            { value: 'Option 3' },
            { value: 'Option 4' },
            { value: 'Option 5' },
            { value: 'Option 6' },
            { value: 'Option 7' },
            { value: 'Option 8' },
            { value: 'Option 9' },
          ]}
          title={'Select a job area'}
        />
      </>
    ),
  },
};
