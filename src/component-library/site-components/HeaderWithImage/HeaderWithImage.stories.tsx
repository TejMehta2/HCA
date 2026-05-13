import React from 'react';
import HeaderWithImage from './HeaderWithImage';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Doctify from '../../components/Doctify/Doctify';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderWithImage> = {
  title: 'site-components/HeaderWithImage',
  component: HeaderWithImage,
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
  argTypes: {
    title: {
      control: false,
      table: {
        disable: true,
      },
    },
    copy: {
      control: false,
      table: {
        disable: true,
      },
    },
    ctas: {
      control: false,
      table: {
        disable: true,
      },
    },
    image: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderWithImage> = {
  args: {
    title: (
      <Text variation="display-1" tag="h2">
        Departments
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
        src="/placeholders/lab-technician.jpeg"
        alt="lab technician"
        width="1024"
        height="683"
      />
    ),
    theme: 'F-HCA-Fern',
  },
};

export const WithSubtitle: StoryObj<typeof HeaderWithImage> = {
  args: {
    title: (
      <Text variation="display-1" tag="h1">
        Departments
      </Text>
    ),
    subtitle: (
      <Text variation="subheading-1" tag="h2">
        Departments
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
        src="/placeholders/lab-technician.jpeg"
        alt="lab technician"
        width="1024"
        height="683"
      />
    ),
    theme: 'F-HCA-Fern',
  },
};

export const WithSubtitleBefore: StoryObj<typeof HeaderWithImage> = {
  args: {
    ...WithSubtitle.args,
    subtitlePlacement: 'before',
  },
};

export const WithRatings: StoryObj<typeof HeaderWithImage> = {
  args: {
    ...WithSubtitleBefore.args,
    ratings: (
      <Themes theme="B-HCA-Navy-Blue">
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
      </Themes>
    ),
  },
};

export const HeaderWithImageNoMask: StoryObj<typeof HeaderWithImage> = {
  args: {
    title: (
      <Text variation="display-1" tag="h2">
        Get the HCA UK treatment
      </Text>
    ),
    copy: (
      <Text variation="body-large" tag="p">
        Choose the private hospital network that’s focused in microscopic detail
        On you Get the HCA UK Treatment
      </Text>
    ),
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
        src="/placeholders/cut-out-image.png"
        alt="HCA worker"
        width="1024"
        height="683"
      />
    ),
    theme: 'F-HCA-Fern',
    noMask: true,
  },
};

export const FullWidthImage: StoryObj<typeof HeaderWithImage> = {
  args: {
    subtitlePlacement: 'before',
    contentVariation: 'fullWidthImage',
    subtitle: <Text variation="subheading-1">Our roles</Text>,
    title: <Text variation="display-1">Quality care takes diverse people</Text>,
    copy: (
      <Text variation="body-large">
        From physicians to physiotherapists, all of our colleagues play a part
        in delivering excellence for our patients.
      </Text>
    ),
    ctas: (
      <Button size="large" variation="full">
        <a href="#">
          <Icons iconName="iconSearch" />
          <span>
            Search <strong>roles</strong>
          </span>
        </a>
      </Button>
    ),
    image: (
      <Image
        src="/placeholders/quality-care.jpg"
        alt="quality care"
        width="1512"
        height="814"
      />
    ),
  },
};

export const FullWidthImageWideText: StoryObj<typeof HeaderWithImage> = {
  args: {
    theme: 'Alan-Black',
    subtitlePlacement: 'before',
    contentVariation: 'fullWidthImage',
    textWidth: 'wide',
    subtitle: <Text variation="subheading-1">We are BPS</Text>,
    title: (
      <Text variation="display-1">
        Birmingham <span className="highlight">Prostate</span> Specialists
      </Text>
    ),
    copy: (
      <Text variation="body-large">
        We’re one of the UK’s most progressive prostate clinics, led by highly
        respected consultant urologist Alan Doherty and specialist
        oncologist Dan Ford. Our Birmingham-based multidisciplinary team treats
        patients nationally and internationally, offering expert advice
        and tailored care shaped by the priorities that matter to you. 
      </Text>
    ),
    ctas: (
      <Button size="large" variation="full">
        <a href="#">
          <Icons iconName="iconSearch" />
          <span>
            Search <strong>roles</strong>
          </span>
        </a>
      </Button>
    ),
    image: (
      <Image
        src="/placeholders/quality-care.jpg"
        alt="quality care"
        width="1512"
        height="814"
      />
    ),
  },
};
