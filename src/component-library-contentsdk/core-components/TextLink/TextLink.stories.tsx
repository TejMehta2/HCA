import React from 'react';
import TextLink from './TextLink';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextLink> = {
  title: 'core-components/TextLink',
  component: TextLink,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const exampleClick = () => {
  alert('TextLink was clicked');
};
export const Default: StoryObj<typeof TextLink> = {
  args: {
    children: (
      <button onClick={exampleClick}>
        <span>TextLink</span> <Icons iconName="iconCross" />
      </button>
    ),
  },
};

export const SideBySide: StoryObj<typeof TextLink> = {
  args: {
    children: (
      <button onClick={exampleClick}>
        <span>TextLink</span>
        <Icons iconName="iconCross" />
      </button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const SideBySideWithWrapping: StoryObj<typeof TextLink> = {
  args: {
    children: (
      <button onClick={exampleClick}>
        <span>
          Text Link Text Link Text Link Text Link Text Link Text Link
        </span>{' '}
      </button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const SideBySideWithWrappingWithIcons: StoryObj<typeof TextLink> = {
  args: {
    children: (
      <button onClick={exampleClick}>
        <span>Text Link Text Link Text Link Text Link Text Link Text Link</span>{' '}
        <Icons iconName="iconCross" />
      </button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Story />
        <Story />
      </div>
    ),
  ],
};

export const Wrapping: StoryObj<typeof TextLink> = {
  args: {
    children: (
      <button onClick={exampleClick}>
        <span>
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link
        </span>
      </button>
    ),
  },
};

export const WrappingWithIcon: StoryObj<typeof TextLink> = {
  args: {
    children: (
      <button onClick={exampleClick}>
        <span>
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link Text Link Text Link Text Link Text Link
          Text Link Text Link Text Link
        </span>
        <span>
          <Icons iconName="iconCross" />
        </span>
      </button>
    ),
  },
};
