import React from 'react';
import Accordion from './Accordion';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Accordion> = {
  title: 'components/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
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

export const Default: StoryObj<typeof Accordion> = {
  args: {
    title: 'Fugiat duis cupidatat ad deserunt est mollit ex mollit',
    children: (
      <p>
        Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
        deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non. Elit
        dolore consequat veniam et. Eiusmod consectetur sit dolor laborum
        excepteur laborum quis.
      </p>
    ),
  },
};
