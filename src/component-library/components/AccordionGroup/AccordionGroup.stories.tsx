import React from 'react';
import AccordionGroup from './AccordionGroup';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AccordionGroup> = {
  title: 'components/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <Themes theme={'f'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof AccordionGroup> = {
  args: {
    header: (
      <Text tag="h3" variation="display-3">
        Hip Pain FAQ
      </Text>
    ),
    accordions: [
      {
        title: 'How long will I have to wait to book a hip pain appointment?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'How long will I have to wait to book a hip pain appointment?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'How long will I have to wait to book a hip pain appointment?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'How long will I have to wait to book a hip pain appointment?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
    ],

    cta: <button>View all FAQs</button>,
  },
};
