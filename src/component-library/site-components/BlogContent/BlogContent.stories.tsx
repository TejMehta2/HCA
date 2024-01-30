import React from 'react';
import BlogContent from './BlogContent';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BlogContent> = {
  title: 'site-components/BlogContent',
  component: BlogContent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof BlogContent> = {
  args: {
    theme: 'F-HCA-White',
    children: (
      <p>
        London Bridge Hospital, part of HCA Healthcare UK, has once again been
        rated as &quot;Outstanding&quot; by the Care Quality Commission (CQC),
        following a recent inspection. London Bridge Hospital has held its
        Outstanding rating since 2016.
      </p>
    ),
  },
};
