import React from 'react';
import DualCTABlock from './DualCTABlock';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DualCTABlock> = {
  title: 'careers/DualCTABlock',
  component: DualCTABlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof DualCTABlock> = {
  args: {
    theme: 'A-HCA-White',
    content: [
      {
        subheader: (
          <Text tag="p" variation="subheading-1">
            Register for job alerts
          </Text>
        ),
        header: (
          <Text tag="h3" variation="display-2">
            Stay ahead of the game
          </Text>
        ),
        bodyCopy: (
          <Text tag="p" variation="body-large">
            We&apos;re always looking for talented people. <br />
            Make sure you never miss one of our new opportunities
          </Text>
        ),
        cta: (
          <>
            <Button size="large" variation="full">
              <a href="#">
                <Icons iconName="iconEmail" />
                <span>
                  Register <strong>your interest</strong>
                </span>
              </a>
            </Button>
          </>
        ),
      },
      {
        subheader: (
          <Text tag="p" variation="subheading-1">
            Express your interest
          </Text>
        ),
        header: (
          <Text tag="h3" variation="display-2">
            Take the first step towards your goal
          </Text>
        ),
        bodyCopy: (
          <Text tag="p" variation="body-large">
            We can help find a job that suits you. Submit your CV and we&apos;ll
            match it with suitable roles when they become available and contact
            you directly.
          </Text>
        ),
        cta: (
          <>
            <Button size="large" variation="full">
              <a href="#">
                <Icons iconName="iconArrowSmallUp" />
                <span>
                  Submit <strong>your CV</strong>
                </span>
              </a>
            </Button>
          </>
        ),
      },
    ],
  },
};
