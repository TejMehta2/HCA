import React from 'react';
import YextResultCardConsultants from './YextResultCardConsultants';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Doctify from '../../components/Doctify/Doctify';
import TextLink from '../../core-components/TextLink/TextLink';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultCardConsultants> = {
  title: 'yext/YextResultCardConsultants',
  component: YextResultCardConsultants,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextResultCardConsultants> = {
  args: {
    image: (
      <Image
        src="/placeholders/doctor-portrait-circle.png"
        alt="doctor headshot"
        width="140"
        height="140"
      />
    ),
    title: <Text variation="heading-1">Christian Brown</Text>,
    doctify: (
      <Doctify
        alignment="left"
        link={<a href="#"></a>}
        rating={4}
        reviews="13,500 +"
        logo={{
          dark: (
            <Image
              src="/doctify-dark.png"
              alt="doctify logo"
              width="83"
              height="21"
            />
          ),
          light: (
            <Image
              src="/doctify-light.png"
              alt="doctify logo"
              width="83"
              height="21"
            />
          ),
        }}
      />
    ),
    copy: (
      <Text variation="body-large">
        Mr Christian Brown is a Consultant Urological Surgeon and a member of
        the prostate robotic and laparoscopic teams at King&apos;s College
        Hospital....
      </Text>
    ),
    phone: (
      <TextLink variation={'body-large'}>
        <a href={`tel:020 3993 1861`}>
          <Icons iconName="iconPhone"></Icons>
          <span>020 3993 1861</span>
        </a>
      </TextLink>
    ),
    specialties: {
      icon: <Icons iconName="iconStethoscope"></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          General Urology, Urology, Urological Oncology
        </Text>
      ),
    },
    cta: <a href="#">View profile</a>,
  },
};
