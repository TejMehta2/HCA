import React from 'react';
import HomepageIntroBlock from './HomepageIntroBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Doctify from '../Doctify/Doctify';
import Icons from '../../foundation/Icons/Icons';
import CQCBlock from '../CQCBlock/CQCBlock';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HomepageIntroBlock> = {
  title: 'components/HomepageIntroBlock',
  component: HomepageIntroBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HomepageIntroBlock> = {
  args: {
    title: (
      <Text variation="display-1" tag="h2">
        Committed to your care
      </Text>
    ),
    copy: (
      <Text variation="body-large" tag="p">
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </Text>
    ),
    stats: [
      {
        value: <span>26</span>,
        label: <span>years in the UK</span>,
      },
      {
        value: <span>3,000</span>,
        label: <span>consultants</span>,
      },
      {
        value: <span>770</span>,
        label: <span>inpatient beds</span>,
      },
    ],
    cta: (
      <a href="#">
        About <strong>HCA Healthcare UK</strong>
      </a>
    ),
    image: (
      <Image
        src="/placeholders/happy-nurse.jpeg"
        alt=""
        width="1875"
        height="1500"
      />
    ),
    cqc: (
      <CQCBlock
        theme="light"
        link={<a href="#"></a>}
        title="Care Quality Commission verified"
        text="All our hospitals are rated Good or Oustanding."
        icon={<Icons iconName="iconCheckCircle"></Icons>}
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
    doctify: (
      <Doctify
        alignment="left"
        link={<a href="#"></a>}
        rating={5}
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
  },
};

export const ImageAlignmentLeft: StoryObj<typeof HomepageIntroBlock> = {
  args: {
    imageAlignment: 'left',
    title: (
      <Text variation="display-1" tag="h2">
        Committed to your care
      </Text>
    ),
    copy: (
      <Text variation="body-large" tag="p">
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </Text>
    ),
    stats: [
      {
        value: <span>26</span>,
        label: <span>years in the UK</span>,
      },
      {
        value: <span>3,000</span>,
        label: <span>consultants</span>,
      },
      {
        value: <span>770</span>,
        label: <span>inpatient beds</span>,
      },
    ],
    cta: (
      <a href="#">
        About <strong>HCA Healthcare UK</strong>
      </a>
    ),
    image: (
      <Image
        src="/placeholders/happy-nurse.jpeg"
        alt=""
        width="1875"
        height="1500"
      />
    ),
    cqc: (
      <CQCBlock
        theme="light"
        link={<a href="#"></a>}
        title="Care Quality Commission verified"
        text="All our hospitals are rated Good or Oustanding."
        icon={<Icons iconName="iconCheckCircle"></Icons>}
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
    doctify: (
      <Doctify
        alignment="left"
        link={<a href="#"></a>}
        rating={5}
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
  },
};
