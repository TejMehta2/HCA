import React from 'react';
import CareersSearch from './CareersSearch';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import SelectField from '../../core-components/SelectField/SelectField';

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
      <SearchBar
        showIcon={false}
        preventSubmitOnSuggestion={true}
        name="input"
        placeholder="Search for a keyword or role e.g 'staff nurse'"
      />
    ),
    filters: (
      <>
        <SelectField
          options={[
            { text: 'Option a' },
            { text: 'Option b' },
            { text: 'Option c' },
            { text: 'Option d' },
            { text: 'Option e' },
            { text: 'Option f' },
            { text: 'Option g' },
            { text: 'Option h' },
            { text: 'Option i' },
          ]}
          id="region"
          placeholder="Select a region"
        />
      </>
    ),
    submit: (
      <Button variation="full" size="small" contentVariation="search">
        <button type="submit">
          <Icons iconName="iconSearch" />
          <span className="sr-only">Search</span>
        </button>
      </Button>
    ),
  },
};
