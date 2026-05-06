import Themes from '../../foundation/Themes/Themes';
import SearchSuggestions from './SearchSuggestions';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchSuggestions> = {
  title: 'components/SearchSuggestions',
  component: SearchSuggestions,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof SearchSuggestions> = {
  args: {
    suggestions: ['Suggestion A', 'Suggestion B'],
    currentValue: 'Suggestion A',
    setValue: (newValue: string) => console.log(newValue),
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <div style={{ maxWidth: '600px', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
