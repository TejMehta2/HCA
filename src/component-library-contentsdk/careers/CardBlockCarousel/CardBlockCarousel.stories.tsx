import React from 'react';
import Image from 'next/image';
import CardBlockCarousel from './CardBlockCarousel';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardBlockCarousel> = {
  title: 'careers/CardBlockCarousel',
  component: CardBlockCarousel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardBlockCarousel> = {
  args: {
    subtitle: (
      <Text tag="p" variation="subheading-1">
        Our benefits
      </Text>
    ),
    title: (
      <Text tag="h2" variation="display-2">
        Focused on creating a brilliant place to work
      </Text>
    ),
    bodyText: (
      <Text tag="p" variation="body-medium">
        Delivering quality patient care and innovative treatments is achieved
        through diverse people working in diverse roles, which means
        there&apos;s a good chance we&apos;ll have an opportunity to suit you.
      </Text>
    ),
    cards: [
      {
        image: (
          <Image
            src="/placeholders/london.jpg"
            alt="london"
            width="456"
            height="253"
          />
        ),
        icon: <Icons iconName="iconCreditCard48" />,
        title: 'Private healthcare for your whole family',
        bodyText: (
          <Text tag="p" variation="body-medium">
            Your holidays are important to you. That&apos;s why we&apos;ll sign
            you up to the &apos;Beneflex&apos; site where you can buy up to 10
            days extra annual leave.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconFrame48" />,
        title: 'Season ticket loan',
        bodyText: (
          <Text tag="p" variation="body-medium">
            You can start your pension as soon as you join us. Which means with
            us, you can look out for your future from day one.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconPlus48" />,
        title: 'Season ticket loan',
        bodyText: (
          <Text tag="p" variation="body-medium">
            You can start your pension as soon as you join us. Which means with
            us, you can look out for your future from day one.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconStethoscope48" />,
        title: 'Access to a private GP',
        bodyText: (
          <Text tag="p" variation="body-medium">
            See a private GP as often as you need to. We&apos;ll give you the
            time you need to talk it through during your appointment, for your
            peace of mind and ours at a minimal cost.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconShieldCheck48" />,
        title: 'Access to a private GP',
        bodyText: (
          <Text tag="p" variation="body-medium">
            See a private GP as often as you need to. We&apos;ll give you the
            time you need to talk it through during your appointment, for your
            peace of mind and ours at a minimal cost.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconCreditCard48" />,
        title: 'Season ticket loan',
        bodyText: (
          <Text tag="p" variation="body-medium">
            You can start your pension as soon as you join us. Which means with
            us, you can look out for your future from day one.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconCreditCard48" />,
        title: 'Season ticket loan',
        bodyText: (
          <Text tag="p" variation="body-medium">
            You can start your pension as soon as you join us. Which means with
            us, you can look out for your future from day one.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconCreditCard48" />,
        title: 'Season ticket loan',
        bodyText: (
          <Text tag="p" variation="body-medium">
            You can start your pension as soon as you join us. Which means with
            us, you can look out for your future from day one.
          </Text>
        ),
      },
      {
        icon: <Icons iconName="iconCreditCard48" />,
        title: 'Season ticket loan',
        bodyText: (
          <Text tag="p" variation="body-medium">
            You can start your pension as soon as you join us. Which means with
            us, you can look out for your future from day one.
          </Text>
        ),
      },
    ],
  },
};
