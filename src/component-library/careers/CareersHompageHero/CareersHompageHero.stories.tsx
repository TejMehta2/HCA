import React from 'react';
import CareersHompageHero from './CareersHompageHero';
import type { Meta, StoryObj } from '@storybook/react';
import SearchButton from '../../components/SearchButton/SearchButton';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import YextStyledStaticFilters from '../../yext/YextStyledStaticFilters/YextStyledStaticFilters';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CareersHompageHero> = {
  title: 'careers/CareersHompageHero',
  component: CareersHompageHero,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CareersHompageHero> = {
  args: {
    title: (
      <Text tag="h1" variation="display-1">
        Exceptional people. Delivering exceptional care.
      </Text>
    ),
    search: (
      <SearchButton onClick={() => {}}>
        <span>
          Search for a <b>keyword or role</b>
        </span>
      </SearchButton>
    ),
    filters: (
      <>
        <YextStyledStaticFilters
          fieldId={'location'}
          filterOptions={[
            { value: 'Option a' },
            { value: 'Option b' },
            { value: 'Option c' },
            { value: 'Option d' },
            { value: 'Option e' },
            { value: 'Option f' },
            { value: 'Option g' },
            { value: 'Option h' },
            { value: 'Option i' },
          ]}
          title={'Select a location'}
        />
        <YextStyledStaticFilters
          fieldId={'area'}
          filterOptions={[
            { value: 'Option 1' },
            { value: 'Option 2' },
            { value: 'Option 3' },
            { value: 'Option 4' },
            { value: 'Option 5' },
            { value: 'Option 6' },
            { value: 'Option 7' },
            { value: 'Option 8' },
            { value: 'Option 9' },
          ]}
          title={'Select a job area'}
        />
      </>
    ),
    cta: (
      <Button size={'large'} variation={'full'}>
        <a href="#">Search roles</a>
      </Button>
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
  decorators: [
    (Story) => (
      <Themes theme={'B-HCA-Navy-Blue'}>
        <Story />
      </Themes>
    ),
  ],
};
