import React from 'react';
import YextResultCardCareers from './YextResultCardCareers';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultCardCareers> = {
  title: 'yext/YextResultCardCareers',
  component: YextResultCardCareers,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextResultCardCareers> = {
  args: {
    location: 'Head office - London',
    clinical: 'Clinical',
    timing: 'Full time',
    title: (
      <Text variation={'heading-1'}>
        EHR Registration Scheduling Change Lead
      </Text>
    ),
    cta: (
      <Button contentVariation={'full-width'} variation={'full'} size={'small'}>
        <a href="#">Read More & Apply</a>
      </Button>
    ),
  },
};

export const Carousel: StoryObj<typeof YextResultCardCareers> = {
  args: {
    variation: 'carousel',
    city: 'London',
    location: 'Head office',
    clinical: 'Clinical',
    timing: 'Full time',
    title: (
      <Text variation={'heading-2'}>
        {'EHR Registration Scheduling Change Lead'}
      </Text>
    ),
    cta: (
      <Button variation={'full'} size={'small'} contentVariation="card">
        <a href={'job.data.applicationUrl'}>
          <Icons iconName="iconArrowSmallRight" />
        </a>
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '314px' }}>
        <Story />
      </div>
    ),
  ],
};
