import React from 'react';
import HeaderLocation from './HeaderLocation';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Doctify from '../../components/Doctify/Doctify';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderLocation> = {
  title: 'site-components/HeaderLocation',
  component: HeaderLocation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: '110px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderLocation> = {
  args: {
    title: (
      <Text variation="display-2" tag="h2">
        The Wellington Hospital
      </Text>
    ),

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

    address: {
      icon: <Icons iconName="iconPin"></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          Wellington Place St John&apos;s Wood London NW8 9LE
        </Text>
      ),
      link: (
        <TextButton>
          <a href="#">Get Directions</a>
        </TextButton>
      ),
    },

    open: {
      icon: <Icons iconName="iconClock"></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          Open 24/7
        </Text>
      ),
    },
    ctas: (
      <>
        <Button size="large" variation="full" contentVariation="full-width">
          <a href="#">
            <Icons iconName="iconStethoscope" />
            <span>
              Find a <strong>Consultant</strong>
            </span>
          </a>
        </Button>
        <Button size="large" variation="outline" contentVariation="full-width">
          <a href="#">
            <Icons iconName="iconPhone" />
            <span>
              Call us <strong>today</strong>
            </span>
          </a>
        </Button>
      </>
    ),
    image: (
      <Image
        src="/placeholders/the-wellington-hospital.png"
        alt="lab technician"
        width="1024"
        height="683"
      />
    ),
    theme: 'E-HCA-Cerulean',

    cqc: (
      <CQCBlock
        link={<a href="#">CQCBlock</a>}
        icon={<Icons iconName="iconCheckCircle"></Icons>}
        rating="Outstanding"
        logo={{
          dark: (
            <Image
              src="/cqc-white.png"
              alt="cqc logo"
              width="120"
              height="37"
            />
          ),
          light: (
            <Image
              src="/cqc-color.png"
              alt="cqc logo"
              width="120"
              height="37"
            />
          ),
        }}
      />
    ),
  },
};
