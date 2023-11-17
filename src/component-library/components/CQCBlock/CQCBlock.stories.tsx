import React from 'react';
import CQCBlock from './CQCBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CQCBlock> = {
  title: 'components/CQCBlock',
  component: CQCBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CQCBlock> = {
  args: {
    children: (
      <>
        <Text tag="span" variation="BodySemiBoldSmall">
          Care Quality Commission verified
        </Text>
        <Text tag="span" variation="body-small">
          All our hospitals are rated Good or Oustanding.
        </Text>
        <Icons iconName="iconCheckCircle"></Icons>
      </>
    ),
  },
};
