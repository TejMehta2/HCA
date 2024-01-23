import React from 'react';
import CardDoctor from './CardDoctor';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardDoctor> = {
  title: 'components/CardDoctor',
  component: CardDoctor,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-Main-Turquoise'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardDoctor> = {
  args: {
    image: (
      <Image
        src="/placeholders/doctor-portrait-circle.png"
        alt="doctor portrait"
        width="91"
        height="91"
      />
    ),
    title: (
      <Text variation="display-5" tag="h3">
        John Smith
      </Text>
    ),
    department: <span>Orthopaedics</span>,
    cta: (
      <a href="#">
        <span>
          View <strong>profile</strong>
        </span>
      </a>
    ),
  },
};

export const CroppedImage: StoryObj<typeof CardDoctor> = {
  args: {
    image: (
      <Image
        src="/placeholders/happy-nurse.jpeg"
        alt="doctor portrait"
        width="91"
        height="91"
      />
    ),
    title: (
      <Text variation="display-5" tag="h3">
        John Smith
      </Text>
    ),
    department: <span>Orthopaedics</span>,
    cta: (
      <a href="#">
        <span>
          View <strong>profile</strong>
        </span>
      </a>
    ),
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

export const Themed: StoryObj<typeof CardDoctor> = {
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    image: (
      <Image
        src="/placeholders/doctor-portrait-circle.png"
        alt="doctor portrait"
        width="91"
        height="91"
      />
    ),
    title: (
      <Text variation="display-5" tag="h3">
        John Smith
      </Text>
    ),
    department: <span>Orthopaedics</span>,
    cta: (
      <a href="#">
        <span>
          View <strong>profile</strong>
        </span>
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
