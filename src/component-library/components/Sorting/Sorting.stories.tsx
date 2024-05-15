import React from 'react';
import Sorting from './Sorting';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Sorting> = {
  title: 'components/Sorting',
  component: Sorting,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Sorting> = {
  args: {
    options: [
      {
        id: 'option-a',
        defaultChecked: true,
        labelText: 'Alphabetically (A to Z)',
      },
      {
        id: 'option-b',
        labelText: 'Alphabetically (Z to A)',
      },
      { id: 'option-c', labelText: 'Price (Low to High)' },
      {
        id: 'option-d',
        labelText: 'Price (High to Low)',
      },
    ],
    onChange: (event) => {
      console.log(event.target.value);
      console.log(event.target.checked);
    },
  },
  decorators: [
    (Story) => (
      <>
        <Themes theme={'A-HCA-White'}>
          <div
            style={{
              background: 'var(--background)',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'end',
              border: 'solid 2px red',
            }}
          >
            <Story />
          </div>
        </Themes>
        <Themes theme={'B-HCA-Navy-Blue'}>
          <div
            style={{
              background: 'var(--background)',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'end',
              border: 'solid 2px red',
            }}
          >
            <Story />
          </div>
        </Themes>
      </>
    ),
  ],
};
