import React from 'react';
import HomepageIntroBlock from './HomepageIntroBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Doctify from '../../components/Doctify/Doctify';
import Icons from '../../foundation/Icons/Icons';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HomepageIntroBlock> = {
  title: 'site-components/HomepageIntroBlock',
  component: HomepageIntroBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
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
    theme: 'A-HCA-White',
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
    children: (
      <>
        <Button size="small" variation="full">
          <a href="#">
            <span>
              <Icons iconName="iconArrowSmallRight" />
              Button 1
            </span>
          </a>
        </Button>
        <Button size="small" variation="full">
          <a href="#">
            <span>
              <Icons iconName="iconArrowSmallRight" />
              Button 2
            </span>
          </a>
        </Button>
      </>
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

export const WithSubtitle: StoryObj<typeof HomepageIntroBlock> = {
  args: {
    ...Default.args,
    subtitle: (
      <Text tag="p" variation={'subheading-2'}>
        Look at these stats
      </Text>
    ),
  },
};

export const DontKeepAspectRatio: StoryObj<typeof HomepageIntroBlock> = {
  args: {
    ...Default.args,
    imageKeepAspectRatio: false,
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt=""
        width="1875"
        height="1500"
      />
    ),
  },
};

export const KeepAspectRatio: StoryObj<typeof HomepageIntroBlock> = {
  args: {
    ...Default.args,
    imageKeepAspectRatio: true,
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt=""
        width="1875"
        height="1500"
      />
    ),
  },
};

export const CQCOnly: StoryObj<typeof HomepageIntroBlock> = {
  args: {
    imageAlignment: 'left',
    subtitle: (
      <Text variation="subheading-1" tag="p">
        Weight loss services
      </Text>
    ),
    title: (
      <Text variation="display-2" tag="h2">
        Why choose us for your weight loss journey
      </Text>
    ),
    copy: (
      <Text variation="body-large" tag="p">
        At Palace Gate Practice, we are dedicated to providing the latest and
        most effective treatments to support your health and wellbeing. We
        understand that every individual&apos;s journey to better health is
        unique, which is why our doctors work closely with you to create a
        personalised plan that aligns with your goals and lifestyle. <br />
        <br />
        We are now offering Mounjaro (tirzepatide) as a treatment option for
        patients struggling with obesity and weight management. This medication
        is available as part of a comprehensive, medically supervised programme
        that also includes dietary guidance and physical activity advice. By
        combining these elements, we take a holistic approach to helping you
        achieve and maintain a healthy weight.
      </Text>
    ),
    theme: 'Palace-White',
    cta: (
      <a href="#">
        <span>
          <Icons iconName={'iconPhone'} />
        </span>
        Call us to <strong>book an appointment</strong>
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
  },
};
