import React from 'react';
import Accreditations from './Accreditations';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

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
