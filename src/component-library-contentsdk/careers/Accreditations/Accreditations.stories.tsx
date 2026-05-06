import React from 'react';
import Accreditations from './Accreditations';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Tooltips from '../../components/Tooltips/Tooltips';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Accreditations> = {
  title: 'careers/Accreditations',
  component: Accreditations,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Accreditations> = {
  args: {
    items: [
      {
        text: (
          <>
            At HCA UK we recognise the value of candidates who have served in
            the Armed Forces. As proud signatories of the Armed Forces Covenant
            we welcome applications from both Armed Forces Veterans and Armed
            Forces Reservists.
          </>
        ),
        logo: (
          <Image
            src="/accreditations/armed-forces-covenant.png"
            alt=""
            width="178"
            height="88"
          />
        ),
      },
      {
        text: (
          <>
            We take our quality of care very seriously as every one of our
            facilities is monitored, inspected and regulated by CQC. They’ve
            rated 90% of them either Good or Outstanding.
          </>
        ),
        logo: (
          <Image
            src="/accreditations/ima-best-in-class.png"
            alt=""
            width="321"
            height="96"
          />
        ),
      },
      {
        text: (
          <>
            HCA UK are delighted to receive the Best in Class Interactive Media
            Award in the &quot;Recruiting&quot; category for our careers
            website.
          </>
        ),
        logo: (
          <Image
            src="/accreditations/regulated-by-cqc.png"
            alt=""
            width="318"
            height="150"
          />
        ),
      },
      {
        text: (
          <>
            HCA UK is proud to be part of the Disability confident scheme which
            supports employers to successfully employ and retain disabled people
            and those with health conditions.
          </>
        ),
        logo: (
          <Image
            src="/accreditations/disability-confident-committed.png"
            alt=""
            width="489"
            height="235"
          />
        ),
      },
    ],
  },
};

export const ThreeColumnsCentered: StoryObj<typeof Accreditations> = {
  args: {
    items: [
      {
        title: <Text variation="heading-2">Next day appointments</Text>,
        text: (
          <Text variation="body-large">
            You’ll have access to to a cardiac consultant in as little as 24
            hours. <Tooltips display="inline">Tooltip text wow!</Tooltips>
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="calendar">
              <path
                id="Icon"
                d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">State of the art diagnostics</Text>,
        text: (
          <Text variation="body-large">
            With results in as little as 48 hours.{' '}
            <Tooltips display="inline">Tooltip text wow!</Tooltips>
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Microscope" clip-path="url(#clip0_29020_77968)">
              <path
                id="Vector"
                d="M10 42H38"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M12 36H16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M14 36V42"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M18 22L24 28L36 16L30 10L18 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_5"
                d="M21 25L18 28"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_6"
                d="M34 6L40 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_7"
                d="M24 41.9982C26.494 41.9985 28.9262 41.2216 30.9583 39.7756C32.9904 38.3297 34.5215 36.2865 35.3387 33.9302C36.1559 31.5738 36.2186 29.0214 35.5181 26.6277C34.8176 24.2341 33.3886 22.1182 31.43 20.5742"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29020_77968">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        title: (
          <Text variation="heading-2">
            Wide-reaching expertise across the UK
          </Text>
        ),
        text: (
          <Text variation="body-large">
            Visit any one of 15 dedicated diagnostic centres in London,
            Manchester and Birmingham.
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Pin">
              <path
                id="Vector"
                d="M40 20C40 28.836 24 44 24 44C24 44 8 28.836 8 20C8 15.7565 9.68571 11.6869 12.6863 8.68629C15.6869 5.68571 19.7565 4 24 4C28.2435 4 32.3131 5.68571 35.3137 8.68629C38.3143 11.6869 40 15.7565 40 20Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20C26 19.4696 25.7893 18.9609 25.4142 18.5858C25.0391 18.2107 24.5304 18 24 18C23.4696 18 22.9609 18.2107 22.5858 18.5858C22.2107 18.9609 22 19.4696 22 20C22 20.5304 22.2107 21.0391 22.5858 21.4142C22.9609 21.7893 23.4696 22 24 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ),
      },
    ],
    columns: 3,
    contentVariation: 'centered',
  },
};

export const ThreeColumns: StoryObj<typeof Accreditations> = {
  args: {
    items: [
      {
        title: <Text variation="heading-2">Next day appointments</Text>,
        text: (
          <Text variation="body-large">
            You’ll have access to to a cardiac consultant in as little as 24
            hours. <Tooltips display="inline">Tooltip text wow!</Tooltips>
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="calendar">
              <path
                id="Icon"
                d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">State of the art diagnostics</Text>,
        text: (
          <Text variation="body-large">
            With results in as little as 48 hours.{' '}
            <Tooltips display="inline">Tooltip text wow!</Tooltips>
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Microscope" clip-path="url(#clip0_29020_77968)">
              <path
                id="Vector"
                d="M10 42H38"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M12 36H16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M14 36V42"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M18 22L24 28L36 16L30 10L18 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_5"
                d="M21 25L18 28"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_6"
                d="M34 6L40 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_7"
                d="M24 41.9982C26.494 41.9985 28.9262 41.2216 30.9583 39.7756C32.9904 38.3297 34.5215 36.2865 35.3387 33.9302C36.1559 31.5738 36.2186 29.0214 35.5181 26.6277C34.8176 24.2341 33.3886 22.1182 31.43 20.5742"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29020_77968">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        title: (
          <Text variation="heading-2">
            Wide-reaching expertise across the UK
          </Text>
        ),
        text: (
          <Text variation="body-large">
            Visit any one of 15 dedicated diagnostic centres in London,
            Manchester and Birmingham.
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Pin">
              <path
                id="Vector"
                d="M40 20C40 28.836 24 44 24 44C24 44 8 28.836 8 20C8 15.7565 9.68571 11.6869 12.6863 8.68629C15.6869 5.68571 19.7565 4 24 4C28.2435 4 32.3131 5.68571 35.3137 8.68629C38.3143 11.6869 40 15.7565 40 20Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20C26 19.4696 25.7893 18.9609 25.4142 18.5858C25.0391 18.2107 24.5304 18 24 18C23.4696 18 22.9609 18.2107 22.5858 18.5858C22.2107 18.9609 22 19.4696 22 20C22 20.5304 22.2107 21.0391 22.5858 21.4142C22.9609 21.7893 23.4696 22 24 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ),
      },
    ],
    columns: 3,
  },
};

export const ThreeColumnsSixItems: StoryObj<typeof Accreditations> = {
  args: {
    items: [
      {
        title: <Text variation="heading-2">Next day appointments</Text>,
        text: (
          <Text variation="body-large">
            Appointments are confirmed within 24 hours.
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="calendar">
              <path
                id="Icon"
                d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Locations across the UK</Text>,
        text: (
          <Text variation="body-large">
            Total knee replacement surgery at private hospitals across London,
            in the West Midlands and in Cheshire
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Microscope" clip-path="url(#clip0_29020_77968)">
              <path
                id="Vector"
                d="M10 42H38"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M12 36H16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M14 36V42"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M18 22L24 28L36 16L30 10L18 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_5"
                d="M21 25L18 28"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_6"
                d="M34 6L40 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_7"
                d="M24 41.9982C26.494 41.9985 28.9262 41.2216 30.9583 39.7756C32.9904 38.3297 34.5215 36.2865 35.3387 33.9302C36.1559 31.5738 36.2186 29.0214 35.5181 26.6277C34.8176 24.2341 33.3886 22.1182 31.43 20.5742"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29020_77968">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Expert care provided</Text>,
        text: (
          <Text variation="body-large">
            Expert care provided by specialist knee consultants
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Pin">
              <path
                id="Vector"
                d="M40 20C40 28.836 24 44 24 44C24 44 8 28.836 8 20C8 15.7565 9.68571 11.6869 12.6863 8.68629C15.6869 5.68571 19.7565 4 24 4C28.2435 4 32.3131 5.68571 35.3137 8.68629C38.3143 11.6869 40 15.7565 40 20Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20C26 19.4696 25.7893 18.9609 25.4142 18.5858C25.0391 18.2107 24.5304 18 24 18C23.4696 18 22.9609 18.2107 22.5858 18.5858C22.2107 18.9609 22 19.4696 22 20C22 20.5304 22.2107 21.0391 22.5858 21.4142C22.9609 21.7893 23.4696 22 24 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Advanced care</Text>,
        text: (
          <Text variation="body-large">
            Our orthopaedic consultants have performed nearly 2,000 robotically
            assisted surgeries to date, which can result in reduced pain and
            faster recovery times
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="calendar">
              <path
                id="Icon"
                d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: (
          <Text variation="heading-2">Technologically advanced imaging</Text>
        ),
        text: (
          <Text variation="body-large">
            With the latest imaging technology at our disposal, we can
            accurately diagnose your condition and recommend the most effective
            treatment
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Microscope" clip-path="url(#clip0_29020_77968)">
              <path
                id="Vector"
                d="M10 42H38"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M12 36H16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M14 36V42"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M18 22L24 28L36 16L30 10L18 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_5"
                d="M21 25L18 28"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_6"
                d="M34 6L40 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_7"
                d="M24 41.9982C26.494 41.9985 28.9262 41.2216 30.9583 39.7756C32.9904 38.3297 34.5215 36.2865 35.3387 33.9302C36.1559 31.5738 36.2186 29.0214 35.5181 26.6277C34.8176 24.2341 33.3886 22.1182 31.43 20.5742"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29020_77968">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Access to ITUs</Text>,
        text: (
          <Text variation="body-large">
            Our services are supported by Intensive Care Units (ITUs), helping
            people with complex conditions or medical histories
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Pin">
              <path
                id="Vector"
                d="M40 20C40 28.836 24 44 24 44C24 44 8 28.836 8 20C8 15.7565 9.68571 11.6869 12.6863 8.68629C15.6869 5.68571 19.7565 4 24 4C28.2435 4 32.3131 5.68571 35.3137 8.68629C38.3143 11.6869 40 15.7565 40 20Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20C26 19.4696 25.7893 18.9609 25.4142 18.5858C25.0391 18.2107 24.5304 18 24 18C23.4696 18 22.9609 18.2107 22.5858 18.5858C22.2107 18.9609 22 19.4696 22 20C22 20.5304 22.2107 21.0391 22.5858 21.4142C22.9609 21.7893 23.4696 22 24 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ),
      },
    ],
    columns: 3,
  },
};

export const ThreeColumnsSixItemsCentered: StoryObj<typeof Accreditations> = {
  args: {
    items: [
      {
        title: <Text variation="heading-2">Next day appointments</Text>,
        text: (
          <Text variation="body-large">
            Appointments are confirmed within 24 hours.
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="calendar">
              <path
                id="Icon"
                d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Locations across the UK</Text>,
        text: (
          <Text variation="body-large">
            Total knee replacement surgery at private hospitals across London,
            in the West Midlands and in Cheshire
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Microscope" clip-path="url(#clip0_29020_77968)">
              <path
                id="Vector"
                d="M10 42H38"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M12 36H16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M14 36V42"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M18 22L24 28L36 16L30 10L18 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_5"
                d="M21 25L18 28"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_6"
                d="M34 6L40 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_7"
                d="M24 41.9982C26.494 41.9985 28.9262 41.2216 30.9583 39.7756C32.9904 38.3297 34.5215 36.2865 35.3387 33.9302C36.1559 31.5738 36.2186 29.0214 35.5181 26.6277C34.8176 24.2341 33.3886 22.1182 31.43 20.5742"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29020_77968">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Expert care provided</Text>,
        text: (
          <Text variation="body-large">
            Expert care provided by specialist knee consultants
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Pin">
              <path
                id="Vector"
                d="M40 20C40 28.836 24 44 24 44C24 44 8 28.836 8 20C8 15.7565 9.68571 11.6869 12.6863 8.68629C15.6869 5.68571 19.7565 4 24 4C28.2435 4 32.3131 5.68571 35.3137 8.68629C38.3143 11.6869 40 15.7565 40 20Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20C26 19.4696 25.7893 18.9609 25.4142 18.5858C25.0391 18.2107 24.5304 18 24 18C23.4696 18 22.9609 18.2107 22.5858 18.5858C22.2107 18.9609 22 19.4696 22 20C22 20.5304 22.2107 21.0391 22.5858 21.4142C22.9609 21.7893 23.4696 22 24 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Advanced care</Text>,
        text: (
          <Text variation="body-large">
            Our orthopaedic consultants have performed nearly 2,000 robotically
            assisted surgeries to date, which can result in reduced pain and
            faster recovery times
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="calendar">
              <path
                id="Icon"
                d="M32 4V12M16 4V12M6 20H42M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        title: (
          <Text variation="heading-2">Technologically advanced imaging</Text>
        ),
        text: (
          <Text variation="body-large">
            With the latest imaging technology at our disposal, we can
            accurately diagnose your condition and recommend the most effective
            treatment
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Microscope" clip-path="url(#clip0_29020_77968)">
              <path
                id="Vector"
                d="M10 42H38"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M12 36H16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_3"
                d="M14 36V42"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_4"
                d="M18 22L24 28L36 16L30 10L18 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_5"
                d="M21 25L18 28"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_6"
                d="M34 6L40 12"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_7"
                d="M24 41.9982C26.494 41.9985 28.9262 41.2216 30.9583 39.7756C32.9904 38.3297 34.5215 36.2865 35.3387 33.9302C36.1559 31.5738 36.2186 29.0214 35.5181 26.6277C34.8176 24.2341 33.3886 22.1182 31.43 20.5742"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29020_77968">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        title: <Text variation="heading-2">Access to ITUs</Text>,
        text: (
          <Text variation="body-large">
            Our services are supported by Intensive Care Units (ITUs), helping
            people with complex conditions or medical histories
          </Text>
        ),
        logo: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Pin">
              <path
                id="Vector"
                d="M40 20C40 28.836 24 44 24 44C24 44 8 28.836 8 20C8 15.7565 9.68571 11.6869 12.6863 8.68629C15.6869 5.68571 19.7565 4 24 4C28.2435 4 32.3131 5.68571 35.3137 8.68629C38.3143 11.6869 40 15.7565 40 20Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M24 22C24.5304 22 25.0391 21.7893 25.4142 21.4142C25.7893 21.0391 26 20.5304 26 20C26 19.4696 25.7893 18.9609 25.4142 18.5858C25.0391 18.2107 24.5304 18 24 18C23.4696 18 22.9609 18.2107 22.5858 18.5858C22.2107 18.9609 22 19.4696 22 20C22 20.5304 22.2107 21.0391 22.5858 21.4142C22.9609 21.7893 23.4696 22 24 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ),
      },
    ],
    columns: 3,
    contentVariation: 'centered',
  },
};
