import React from 'react';
import VacancyHeader from './VacancyHeader';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VacancyHeader> = {
  title: 'careers/VacancyHeader',
  component: VacancyHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
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
export const Default: StoryObj<typeof VacancyHeader> = {
  args: {
    title: <Text variation={'display-1'}>Staff Nurse - Imaging</Text>,
    location: 'Lister Hospital – London',
    clinical: 'Clinical',
    timing: 'Full time',
    vacancyCode: '0041819',
    cta: (
      <Button variation={'full-light'} size="large">
        <a href="#">
          <span>
            Apply <strong>now</strong>
          </span>
          <Icons iconName={'iconArrowRight'} />
        </a>
      </Button>
    ),
  },
};
