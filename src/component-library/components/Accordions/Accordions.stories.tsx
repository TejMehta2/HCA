import React from 'react';
import Accordions from './Accordions';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Accordions> = {
  title: 'components/Accordions',
  component: Accordions,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },

  decorators: [
    (Story) => (
      <Themes theme={'F-HCA-White'}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof Accordions> = {
  args: {
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
  },
};

const themes: ThemesProps['theme'][] = [
  'A-HCA-Main-Turquoise',
  'B-HCA-Green',
  'C-HCA-Beige',
  'D-HCA-Light-Orange',
  'E-HCA-Dark-Grey',
  'F-HCA-White',
  'G-HCA-Green-40',
  'H-HCA-Green-20',
  'I-HCA-Turquoise-20',
  'J-HCA-Turquoise-10',
  'K-HCA-Turquoise-5',
  'L-HCA-Coral-60',
];
export const Themed: StoryObj<typeof Accordions> = {
  args: {
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
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 1fr)',
        }}
      >
        {themes.map((theme, index) => (
          <Themes key={index} theme={theme}>
            <div style={{ background: 'var(--background)', padding: '1rem' }}>
              <Story />
            </div>
          </Themes>
        ))}
      </div>
    ),
  ],
};
