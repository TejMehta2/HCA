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
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M4.99023 23.6028V6.31705C4.99023 5.66212 5.2504 5.03402 5.7135 4.57092C6.1766 4.10782 6.8047 3.84766 7.45962 3.84766H24.0045C24.201 3.84766 24.3894 3.92571 24.5284 4.06464C24.6673 4.20357 24.7453 4.392 24.7453 4.58847V20.7803M7.45962 21.1334H24.7453M7.45962 26.0722H24.7453"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.45962 26.0726C6.8047 26.0726 6.1766 25.8124 5.7135 25.3493C5.2504 24.8862 4.99023 24.2581 4.99023 23.6032C4.99023 22.9483 5.2504 22.3202 5.7135 21.8571C6.1766 21.394 6.8047 21.1338 7.45962 21.1338"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.1621 8.78613H18.5703"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
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
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M14.8566 14.6184V20.7898M14.8566 9.69354L14.869 9.67996M14.8566 27.5785C21.6736 27.5785 27.1996 22.0525 27.1996 15.2355C27.1996 8.41851 21.6736 2.89258 14.8566 2.89258C8.03961 2.89258 2.51367 8.41851 2.51367 15.2355C2.51367 22.0525 8.03961 27.5785 14.8566 27.5785Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
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
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M11.1504 22.906V22.906C11.1504 25.6328 13.3608 27.8432 16.0876 27.8432H17.939C21.6883 27.8432 24.7276 24.8039 24.7276 21.0546V19.8203"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14.8547 6.86035H14.9108C16.9249 6.86035 18.5576 8.49307 18.5576 10.5071V15.5004C18.5576 19.5905 15.2419 22.9062 11.1519 22.9062V22.9062C7.06177 22.9062 3.74609 19.5905 3.74609 15.5004V10.5071C3.74609 8.49307 5.37881 6.86035 7.39287 6.86035H7.66077"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="13.8555"
                y1="9.5625"
                x2="13.8555"
                y2="4.15674"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="7.68164"
                y1="9.5625"
                x2="7.68164"
                y2="4.15674"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="24.7263"
                cy="15.7351"
                r="2.70288"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
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
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};

export const ResponsiveIcons: StoryObj<typeof IconCtaBlock> = {
  args: {
    children: (
      <>
        <IconCtaBlockChild
          iconMobile={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M4.99023 23.6028V6.31705C4.99023 5.66212 5.2504 5.03402 5.7135 4.57092C6.1766 4.10782 6.8047 3.84766 7.45962 3.84766H24.0045C24.201 3.84766 24.3894 3.92571 24.5284 4.06464C24.6673 4.20357 24.7453 4.392 24.7453 4.58847V20.7803M7.45962 21.1334H24.7453M7.45962 26.0722H24.7453"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.45962 26.0726C6.8047 26.0726 6.1766 25.8124 5.7135 25.3493C5.2504 24.8862 4.99023 24.2581 4.99023 23.6032C4.99023 22.9483 5.2504 22.3202 5.7135 21.8571C6.1766 21.394 6.8047 21.1338 7.45962 21.1338"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.1621 8.78613H18.5703"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          iconDesktop={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
            >
              <path
                d="M8.28516 38.2148V10.2148C8.28516 9.15398 8.70658 8.13656 9.45673 7.38642C10.2069 6.63627 11.2243 6.21484 12.2852 6.21484H39.0852C39.4034 6.21484 39.7086 6.34127 39.9337 6.56632C40.1587 6.79136 40.2852 7.09658 40.2852 7.41484V33.6428M12.2852 34.2148H40.2852M12.2852 42.2148H40.2852"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.2852 42.2148C11.2243 42.2148 10.2069 41.7934 9.45673 41.0433C8.70658 40.2931 8.28516 39.2757 8.28516 38.2148C8.28516 37.154 8.70658 36.1366 9.45673 35.3864C10.2069 34.6363 11.2243 34.2148 12.2852 34.2148"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.2852 14.2148H30.2852"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
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
          iconMobile={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M14.8566 14.6184V20.7898M14.8566 9.69354L14.869 9.67996M14.8566 27.5785C21.6736 27.5785 27.1996 22.0525 27.1996 15.2355C27.1996 8.41851 21.6736 2.89258 14.8566 2.89258C8.03961 2.89258 2.51367 8.41851 2.51367 15.2355C2.51367 22.0525 8.03961 27.5785 14.8566 27.5785Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          iconDesktop={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
            >
              <path
                d="M24.2852 23.2148V33.2148M24.2852 15.2348L24.3052 15.2128M24.2852 44.2148C35.3312 44.2148 44.2852 35.2608 44.2852 24.2148C44.2852 13.1688 35.3312 4.21484 24.2852 4.21484C13.2392 4.21484 4.28516 13.1688 4.28516 24.2148C4.28516 35.2608 13.2392 44.2148 24.2852 44.2148Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
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
          iconMobile={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M11.1504 22.906V22.906C11.1504 25.6328 13.3608 27.8432 16.0876 27.8432H17.939C21.6883 27.8432 24.7276 24.8039 24.7276 21.0546V19.8203"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14.8547 6.86035H14.9108C16.9249 6.86035 18.5576 8.49307 18.5576 10.5071V15.5004C18.5576 19.5905 15.2419 22.9062 11.1519 22.9062V22.9062C7.06177 22.9062 3.74609 19.5905 3.74609 15.5004V10.5071C3.74609 8.49307 5.37881 6.86035 7.39287 6.86035H7.66077"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="13.8555"
                y1="9.5625"
                x2="13.8555"
                y2="4.15674"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="7.68164"
                y1="9.5625"
                x2="7.68164"
                y2="4.15674"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="24.7263"
                cy="15.7351"
                r="2.70288"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          iconDesktop={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
            >
              <path
                d="M18.2852 36.2148V36.2148C18.2852 40.6331 21.8669 44.2148 26.2852 44.2148H29.2852C35.3603 44.2148 40.2852 39.29 40.2852 33.2148V31.2148"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M24.2852 10.2148H24.3761C27.6396 10.2148 30.2852 12.8604 30.2852 16.1239V24.2148C30.2852 30.8423 24.9126 36.2148 18.2852 36.2148V36.2148C11.6577 36.2148 6.28516 30.8423 6.28516 24.2148V16.1239C6.28516 12.8604 8.93075 10.2148 12.1942 10.2148H13.2852"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="23.5352"
                y1="15.4648"
                x2="23.5352"
                y2="4.96484"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="13.5352"
                y1="15.4648"
                x2="13.5352"
                y2="4.96484"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="40.2852"
                cy="26.2148"
                r="5.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
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
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};
