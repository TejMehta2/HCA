import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react';
import TextLink from '../../core-components/TextLink/TextLink';
import Icons from '../../foundation/Icons/Icons';

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
    backCta: {
      link: '#',
      text: 'Services & Treatments',
    },
    children: (
      <>
        <TextLink>
          <a href="#">
            <Icons iconName="iconHome"></Icons>
            <span className="sr-only">Home</span>
          </a>
        </TextLink>
        <TextLink>
          <a href="#">Services & Treatments</a>
        </TextLink>
        <TextLink>
          <a href="#">Treatments</a>
        </TextLink>
        <TextLink>
          <span>Hip replacement</span>
        </TextLink>
      </>
    ),
  },
};
