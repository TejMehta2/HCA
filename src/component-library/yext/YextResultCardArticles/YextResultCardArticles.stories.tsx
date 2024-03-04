import React from 'react';
import YextResultCardArticles from './YextResultCardArticles';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultCardArticles> = {
  title: 'yext/YextResultCardArticles',
  component: YextResultCardArticles,
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
export const Default: StoryObj<typeof YextResultCardArticles> = {
  args: {
    title: (
      <Text tag="h3" variation={'heading-1'}>
        HCA Healthcare UK invests £7m in new fleet of state-of- the art da Vinci
        Xi robots
      </Text>
    ),
    description: (
      <Text tag="div" variation={'body-large'}>
        The announcement today includes the investment in the da Vinci&apos;s
        minimally invasive robotic capability at HCA Healthcare UK`&apos;s The
        Lister Hospital for the first time. HCA Healthcare UK has invested in
        four new da Vinci Xi robots, confirming its status...
      </Text>
    ),
    image: <img alt={''} src={'/placeholders/children-playing.jpg'} />,
    cta: (
      <Button size={'small'} variation={'full'} contentVariation={'full-width'}>
        <a href={'#'}>{'Read more'}</a>
      </Button>
    ),
  },
};
