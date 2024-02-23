import React from 'react';
import Numbers from './Numbers';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Numbers> = {
  title: 'components/Numbers',
  component: Numbers,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
};

const themes: ThemesProps['theme'][] = [
  'A-HCA-White',
  'B-HCA-Navy-Blue',
  'C-HCA-Denim',
  'D-HCA-Teal',
  'E-HCA-Cerulean',
  'F-HCA-Fern',
  'G-HCA-Orange',
  'H-HCA-Tangerine',
  'I-HCA-Goldenrod',
  'J-HCA-Tangerine-20',
  'K-HCA-Fern-20',
  'L-HCA-Teal-5',
  'M-HCA-Goldenrod-20',
  'N-HCA-Denim-5',
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Large: StoryObj<typeof Numbers> = {
  args: {
    number: <span>5</span>,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        }}
      >
        {themes.map((theme, index) => (
          <Themes key={index} theme={theme}>
            <div
              style={{
                background: 'var(--background)',
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Story />
            </div>
          </Themes>
        ))}
      </div>
    ),
  ],
};

export const Small: StoryObj<typeof Numbers> = {
  args: {
    number: <span>5</span>,
    size: 'small',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        }}
      >
        {themes.map((theme, index) => (
          <Themes key={index} theme={theme}>
            <div
              style={{
                background: 'var(--background)',
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Story />
            </div>
          </Themes>
        ))}
      </div>
    ),
  ],
};
