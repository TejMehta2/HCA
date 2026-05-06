import ColourContainer from './Colours.demo';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ColourContainer> = {
  title: 'Foundation/Colours',
  component: ColourContainer,
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Demo: StoryObj<typeof ColourContainer> = {};
