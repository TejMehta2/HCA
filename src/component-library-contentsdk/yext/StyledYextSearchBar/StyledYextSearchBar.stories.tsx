import React from 'react';
import StyledYextSearchBar from './StyledYextSearchBar';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import styles from '../YextSearch/YextSearch.module.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StyledYextSearchBar> = {
  title: 'yext/StyledYextSearchBar',
  component: StyledYextSearchBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof StyledYextSearchBar> = {
  args: {
    placeholder: 'How can we help you?',
  },
  decorators: [
    (Story) => (
      <Themes theme={'J-HCA-Tangerine-20'}>
        <div className={styles.inner}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
