import Icons from './Icons';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Icons> = {
  title: 'foundation/Icons',
  component: Icons,

  parameters: {
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Icons> = {
  args: {
    iconName: 'icon3Lines',
  },
};
