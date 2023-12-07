import React from 'react';
import HeaderPlain from './HeaderPlain';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderPlain> = {
  title: 'components/HeaderPlain',
  component: HeaderPlain,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'a'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderPlain> = {
  args: {
    subheading: (
      <Text tag="h3" variation="subheading-1">
        Optional meta title
      </Text>
    ),
    heading: (
      <Text tag="h1" variation="display-1">
        News & articles about healthcare
      </Text>
    ),
    children: (
      <p>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </p>
    ),
  },
};

const themes: ThemesProps['theme'][] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
];
export const Themed: StoryObj<typeof HeaderPlain> = {
  args: {
    subheading: (
      <Text tag="h3" variation="subheading-1">
        Optional meta title
      </Text>
    ),
    heading: (
      <Text tag="h1" variation="display-1">
        News & articles about healthcare
      </Text>
    ),
    children: (
      <p>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 1fr)',
        }}
      >
        {themes.map((theme, index) => (
          <Themes key={index} theme={theme}>
            <div style={{ paddingBottom: 16 }}>
              <Story />
            </div>
          </Themes>
        ))}
      </div>
    ),
  ],
};
