import React from 'react';
import Image from 'next/image';
import CareersImageHeader from './CareersImageHeader';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CareersImageHeader> = {
  title: 'careers/CareersImageHeader',
  component: CareersImageHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CareersImageHeader> = {
  args: {
    subtitle: <Text variation="subheading-1">Our roles</Text>,
    title: <Text variation="display-1">Quality care takes diverse people</Text>,
    bodyCopy: (
      <Text variation="body-large">
        From physicians to physiotherapists, all of our colleagues play a part
        in delivering excellence for our patients.
      </Text>
    ),
    cta: (
      <Button size="large" variation="full">
        <a href="#">
          <Icons iconName="iconSearch" />
          <span>
            Search <strong>roles</strong>
          </span>
        </a>
      </Button>
    ),
    image: (
      <Image
        src="/placeholders/quality-care.jpg"
        alt="quality care"
        width="1512"
        height="814"
      />
    ),
  },
};
