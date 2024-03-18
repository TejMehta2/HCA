import React from 'react';
import FormProgressBar from './FormProgressBar';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FormProgressBar> = {
  title: 'site-components/FormProgressBar',
  component: FormProgressBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof FormProgressBar> = {
  args: {
    pages: [
      {
        pageControl: (
          <div>
            <Icons iconName="iconInfo" />
            <Text variation="body-medium-extra-large">Patient Details</Text>
          </div>
        ),
        stage: 'previous',
      },
      {
        pageControl: (
          <div>
            <Icons iconName="iconCreditCard" />
            <Text variation="body-bold-extra-large">Payment</Text>
          </div>
        ),
        stage: 'active',
      },
      {
        pageControl: (
          <div>
            <Icons iconName="iconCheckCircle" />
            <Text variation="body-medium-extra-large">Confirmation</Text>
          </div>
        ),
        stage: 'inactive',
      },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <Themes theme={'A-HCA-White'}>
          <Story />
        </Themes>
      );
    },
  ],
};
