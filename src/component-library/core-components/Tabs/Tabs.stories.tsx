import React from 'react';
import Tabs from './Tabs';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Tabs> = {
  title: 'core-components/Tabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'orange',
      values: [{ name: 'orange', value: '#EFF8F8' }],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: [],
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Tabs> = {
  args: {
    callback: ({
      label,
    }: {
      label: string;
      value: string;
      name: string;
      index: number;
    }) => console.log(label),
    tabs: [
      { icon: 'iconOneOff', label: 'One-off' },
      { icon: 'iconFlexible', label: 'Flexi' },
      { icon: 'iconCalendar', label: 'Annual' },
    ],
  },
};

export const NoIcon: StoryObj<typeof Tabs> = {
  args: {
    callback: ({
      label,
    }: {
      label: string;
      value: string;
      name: string;
      index: number;
    }) => console.log(label),
    tabs: [{ label: 'One-off' }, { label: 'Flexi' }, { label: 'Annual' }],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px', border: 'solid 1px red' }}>
        <Story />
      </div>
    ),
  ],
};

export const Overflow: StoryObj<typeof Tabs> = {
  args: {
    callback: ({
      label,
    }: {
      label: string;
      value: string;
      name: string;
      index: number;
    }) => console.log(label),
    tabs: [
      { icon: 'iconOneOff', label: 'One-off' },
      { icon: 'iconFlexible', label: 'Flexi' },
      { icon: 'iconCalendar', label: 'Annual' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px', border: 'solid 1px red' }}>
        <Story />
      </div>
    ),
  ],
};
