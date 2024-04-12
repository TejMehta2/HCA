import React from 'react';
import TextBlockContainer from './TextBlockContainer';
import type { Meta, StoryObj } from '@storybook/react';
import { Default as TextBlockHeaderDefault } from '../TextBlockHeader/TextBlockHeader.stories';
import TextBlockHeader from '../TextBlockHeader/TextBlockHeader';
import RichText from '../../core-components/RichText/RichText';
import { Default as RichTextDefault } from '../../core-components/RichText/RichText.stories';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextBlockContainer> = {
  title: 'site-components/TextBlockContainer',
  component: TextBlockContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof TextBlockContainer> = {
  args: {
    children: (
      <>
        <TextBlockHeader {...TextBlockHeaderDefault.args} />
        <RichText {...RichTextDefault.args} />
      </>
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

export const DarkTheme: StoryObj<typeof TextBlockContainer> = {
  args: {
    children: (
      <>
        <TextBlockHeader {...TextBlockHeaderDefault.args} />
        <RichText {...RichTextDefault.args} />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme={'B-HCA-Navy-Blue'}>
        <Story />
      </Themes>
    ),
  ],
};
