import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react';
import TextLink from '../../core-components/TextLink/TextLink';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Breadcrumbs> = {
  title: 'site-components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Breadcrumbs> = {
  args: {
    children: [
      <TextLink key={1}>
        <a href="#">Services & Treatments</a>
      </TextLink>,
      <TextLink key={2}>
        <a href="#">Services & Treatments</a>
      </TextLink>,
      <TextLink key={3}>
        <a href="#">Services & Treatments</a>
      </TextLink>,
      <TextLink key={4}>
        <span>Service Lines</span>
      </TextLink>,
    ],
  },
};
