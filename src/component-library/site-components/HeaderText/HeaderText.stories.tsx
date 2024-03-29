import React from 'react';
import HeaderText from './HeaderText';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderText> = {
  title: 'site-components/HeaderText',
  component: HeaderText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderText> = {
  args: {
    subtitle: <Text variation={'subheading-1'}>Uh oh</Text>,
    title: <Text variation={'display-2'}>Page not found.</Text>,
    description: (
      <Text variation={'body-large'}>
        Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non cillum
        mollit officia tempor in ad non consequat esse. Sunt culpa adipisicing
        eiusmod ullamco eu esse laborum deserunt et officia reprehenderit.{' '}
      </Text>
    ),
    cta: (
      <Button size={'large'} variation={'full'}>
        <a href="/">
          <span>
            Go <strong>back</strong>
          </span>
        </a>
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};
