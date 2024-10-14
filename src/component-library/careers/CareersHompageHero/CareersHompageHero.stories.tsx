import React from 'react';
import CareersHompageHero from './CareersHompageHero';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import { Default as CareersSearchDefault } from '../CareersSearch/CareersSearch.stories';
import CareersSearch from '../CareersSearch/CareersSearch';
import { CareersSearchProps } from '../CareersSearch/CareersSearch.types';

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
    children: (
      <CareersSearch {...(CareersSearchDefault.args as CareersSearchProps)} />
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
