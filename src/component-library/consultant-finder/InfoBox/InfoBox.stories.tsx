import React from 'react';
import InfoBox from './InfoBox';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof InfoBox> = {
  title: 'consultant-finder/InfoBox',
  component: InfoBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof InfoBox> = {
  args: {
    icon: <Icons iconName="iconStethoscope" />,
    isShortInfo: true,
    shortText: 'Next initial appointment on Fri, Oct 28',
    longTextTitle: 'life-threatening emergencies',
    longText:
      'If you`re experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment.',
    backgroundColour: 'green',
  },
};
