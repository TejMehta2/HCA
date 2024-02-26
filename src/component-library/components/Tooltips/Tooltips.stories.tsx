import React from 'react';
import Tooltips from './Tooltips';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Tooltips> = {
  title: 'components/Tooltips',
  component: Tooltips,

  decorators: [
    (Story) => (
      <div style={{ height: '75px' }}>
        <Themes theme={'A-HCA-White'}>
          <Story />
        </Themes>
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Tooltips> = {
  args: {
    theme: 'light',
    children: <p>Based on 127 patient reviews.</p>,
  },
};

export const Dark: StoryObj<typeof Tooltips> = {
  args: {
    theme: 'dark',
    children: <p>Based on 127 patient reviews.</p>,
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },
};

export const Left: StoryObj<typeof Tooltips> = {
  args: {
    theme: 'light',
    children: <p>Based on 127 patient reviews.</p>,
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Story />
      </div>
    ),
  ],
};

export const Right: StoryObj<typeof Tooltips> = {
  args: {
    theme: 'light',
    children: <p>Based on 127 patient reviews.</p>,
  },

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
};
