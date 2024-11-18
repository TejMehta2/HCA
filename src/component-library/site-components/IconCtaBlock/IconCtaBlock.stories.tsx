import React from 'react';
import IconCtaBlock, { IconCtaBlockChild } from './IconCtaBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof IconCtaBlock> = {
  title: 'site-components/IconCtaBlock',
  component: IconCtaBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof IconCtaBlock> = {
  args: {
    children: (
      <>
        <IconCtaBlockChild
          icon={<Icons iconName="iconBook" />}
          title={
            <Text variation="heading-2">
              Worried about your heart, but not sure what to do?
            </Text>
          }
          copy={
            <Text variation="body-large">
              Get in touch and book a same- or next-day GP appointment
            </Text>
          }
          ctas={
            <>
              <Button variation="full" size="small">
                <a href="#">
                  Book a <b>GP appointment</b>
                </a>
              </Button>
            </>
          }
        />
        <IconCtaBlockChild
          icon={<Icons iconName="iconInfo" />}
          title={
            <Text variation="heading-2">Have a referral and need to book?</Text>
          }
          copy={
            <Text variation="body-large">
              If you’ve already got your referral letter, it couldn’t be
              simpler. You can book a test, scan or treatment directly.
            </Text>
          }
          ctas={
            <>
              <Button
                variation="full"
                size="small"
                contentVariation="full-width"
              >
                <a href="#">
                  See our <b>heart tests & scans</b>
                </a>
              </Button>
              <Button
                variation="outline"
                size="small"
                contentVariation="full-width"
              >
                <a href="#">
                  See our <b>heart treatments</b>
                </a>
              </Button>
            </>
          }
        />
        <IconCtaBlockChild
          icon={<Icons iconName="iconStethoscope" />}
          title={
            <Text variation="heading-2">
              Unsure of a diagnosis and need some answers?
            </Text>
          }
          copy={
            <Text variation="body-large">
              That’s no problem. Get in touch and one of our expert
              cardiologists can talk you through everything you need to know.
            </Text>
          }
          ctas={
            <>
              <Button variation="full" size="small">
                <a href="#">
                  <Icons iconName="iconStethoscope" />
                  <span>
                    Find a <b>heart failure consultant</b>
                  </span>
                </a>
              </Button>
            </>
          }
        />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};
