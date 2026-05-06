import React from 'react';
import Modals from './Modals';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Modals> = {
  title: 'components/Modals',
  component: Modals,
  parameters: {},
  argTypes: {
    variation: {
      control: 'select',
      options: ['full', 'right'],
    },
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Modals> = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f17f6b',
          height: '100%',
        }}
      >
        <Text>Content</Text>
      </div>
    ),
    defaultOpen: true,
    variation: 'full',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const WithOverflow: StoryObj<typeof Modals> = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(0deg, rgba(241,127,107,1) 0%, rgba(0,212,255,1) 100%)',
          height: '150%',
        }}
      >
        <Text>Scrollable content</Text>
      </div>
    ),
    defaultOpen: true,
  },
};

export const VariationRight: StoryObj<typeof Modals> = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(0deg, rgba(241,127,107,1) 0%, rgba(0,212,255,1) 100%)',
          height: '150%',
        }}
      >
        <Text>Scrollable content</Text>
      </div>
    ),
    defaultOpen: true,
    variation: 'right',
  },
};
