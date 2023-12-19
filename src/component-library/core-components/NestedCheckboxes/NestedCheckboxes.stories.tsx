import React from 'react';
import NestedCheckboxes from './NestedCheckboxes';
import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../Checkbox/Checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof NestedCheckboxes> = {
  title: 'core-components/NestedCheckboxes',
  component: NestedCheckboxes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof NestedCheckboxes> = {
  args: {
    items: [
      {
        mainCheckbox: {
          label: 'Main Checkbox',
          name: 'main checkbox',
          value: 'main-checkbox',
          id: 'main',
        },

        subItems: [
          {
            id: '1',
            label: 'Example 1',
            name: 'example-1',
            value: 'example-1',
            checked: false,
          },
          {
            id: '2',
            label: 'Example 2',
            name: 'example-2',
            value: 'example-2',
            checked: false,
          },
          {
            id: '3',
            label: 'Example 3',
            name: 'example-3',
            value: 'example-3',
            checked: false,
          },
        ],
      },
    ],
  },
};
