import React from 'react';
import DiamondLine from './DiamondLine';
import type { Meta, StoryObj } from '@storybook/react';
import { BlogCards } from '../CarouselCards/CarouselCards.stories';
import CarouselCards from '../CarouselCards/CarouselCards';
import { CarouselCardsProps } from '../CarouselCards/CarouselCards.types';
import { Short } from '../ImageAndTextBlock/ImageAndTextBlock.stories';
import ImageAndTextBlock from '../ImageAndTextBlock/ImageAndTextBlock';
import { ImageAndTextBlockProps } from '../ImageAndTextBlock/ImageAndTextBlock.types';
import { Default as HomepageIntroBlockStory } from '../HomepageIntroBlock/HomepageIntroBlock.stories';
import HomepageIntroBlock from '../HomepageIntroBlock/HomepageIntroBlock';
import { HomepageIntroBlockProps } from '../HomepageIntroBlock/HomepageIntroBlock.types';
import { Default as ServiceCardsStory } from '../ServiceCards/ServiceCards.stories';
import ServiceCards from '../ServiceCards/ServiceCards';
import { ServiceCardsProps } from '../ServiceCards/ServiceCards.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DiamondLine> = {
  title: 'site-components/DiamondLine',
  component: DiamondLine,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof DiamondLine> = {
  args: {
    side: 'left',
    theme: 'H-HCA-Tangerine',
  },
  decorators: [
    (Story) => (
      <>
        <CarouselCards {...(BlogCards.args as CarouselCardsProps)} />
        <Story />
        <ImageAndTextBlock {...(Short.args as ImageAndTextBlockProps)} />
      </>
    ),
  ],
};

export const Right: StoryObj<typeof DiamondLine> = {
  args: {
    side: 'right',
    theme: 'G-HCA-Orange',
  },
  decorators: [
    (Story) => (
      <>
        <HomepageIntroBlock
          {...(HomepageIntroBlockStory.args as HomepageIntroBlockProps)}
        />
        <Story />
        <ServiceCards {...(ServiceCardsStory.args as ServiceCardsProps)} />
      </>
    ),
  ],
};
