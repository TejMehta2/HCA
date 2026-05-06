import React from 'react';
import HomepageHero from './HomepageHero';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import SearchButton from '../../components/SearchButton/SearchButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HomepageHero> = {
  title: 'site-components/HomepageHero',
  component: HomepageHero,
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
export const Default: StoryObj<typeof HomepageHero> = {
  args: {
    theme: 'H-HCA-Tangerine',
    title: (
      <Text tag="h1" variation="display-1">
        Extraordinary Healthcare
      </Text>
    ),
    search: (
      <SearchButton onClick={() => {}}>
        <span>
          How can we <b>help you?</b>
        </span>
      </SearchButton>
    ),
    ctaTitle: (
      <Text tag="h2" variation="subheading-1">
        Get Started
      </Text>
    ),
    ctas: (
      <>
        <Button size="large" variation="full" contentVariation="full-width">
          <a href="#">
            <span>
              Book an <strong>appointment</strong>
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
        src="/placeholders/couple-on-bench.jpeg"
        alt="an old couple sitting on a bench having a nice time"
        width={1460}
        height={1460}
      />
    ),
  },
};
