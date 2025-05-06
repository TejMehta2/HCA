import React from 'react';
import DualCTABlock from './DualCTABlock';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
// import TextBlock from '../../site-components/TextBlock/TextBlock';
import CTABlock from '../../site-components/CTABlock/CTABlock';

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
      <div key={0}>
        <CTABlock
          theme="A-HCA-White"
          header={
            <Text tag="h3" variation="display-4">
              Stay ahead of the game
            </Text>
          }
          subheader={
            <Text tag="p" variation="subheading-1">
              Register for job alerts
            </Text>
          }
          ctas={
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
          }
        >
          <Text tag="p" variation="body-large">
            We&apos;re always looking for talented people. <br />
            Make sure you never miss one of our new opportunities
          </Text>
        </CTABlock>
        <CTABlock
          theme="A-HCA-White"
          header={
            <Text tag="h3" variation="display-4">
              Take the first step towards your goal
            </Text>
          }
          subheader={
            <Text tag="p" variation="subheading-1">
              Express your interest
            </Text>
          }
          ctas={
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
          }
        >
          <Text tag="p" variation="body-large">
            We can help find a job that suits you. Submit your CV and we&apos;ll
            match it with suitable roles when they become available and contact
            you directly.
          </Text>
        </CTABlock>
      </div>,
    ],
  },
};
