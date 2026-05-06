import React from 'react';
import CareersSearchResults from './CareersSearchResults';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';
import YextResultCardCareers from '../../yext/YextResultCardCareers/YextResultCardCareers';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CareersSearchResults> = {
  title: 'careers/CareersSearchResults',
  component: CareersSearchResults,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CareersSearchResults> = {
  args: {
    count: (
      <>
        <Text variation="heading-1">{123} vacancies</Text>
        <Text variation="body-bold-medium">Showing 1 - 12</Text>
      </>
    ),
    results: (
      <>
        <YextResultCardCareers
          key={'job.data.id'}
          location={'job.data.jobLocation'}
          clinical={'job.data.jobFunction'}
          timing={'job.data.employmentType'}
          title={<Text variation={'heading-1'}>{'job.data.name'}</Text>}
          cta={
            <Button
              contentVariation={'full-width'}
              variation={'full'}
              size={'small'}
            >
              <a href={'job.data.applicationUrl'}>Read More & Apply</a>
            </Button>
          }
        />
      </>
    ),
    cta: (
      <Button size={'large'} variation={'full'}>
        <button onClick={() => {}}>
          <Icons iconName="iconPlus" />
          <span>
            Show <b>more</b>
          </span>
        </button>
      </Button>
    ),
  },
};
