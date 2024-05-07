import React from 'react';
import YextResultCardLocations from './YextResultCardLocations';
import type { Meta, StoryObj } from '@storybook/react';
import Numbers from '../../components/Numbers/Numbers';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultCardLocations> = {
  title: 'yext/YextResultCardLocations',
  component: YextResultCardLocations,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextResultCardLocations> = {
  args: {
    number: <Numbers number={<span>1</span>} />,
    image: (
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="couple on bench"
        width="140"
        height="140"
      />
    ),
    title: (
      <Text variation="heading-1">
        Golders Green Outpatients and Diagnostics Centre
      </Text>
    ),
    distance: <Text variation={'body-large'}>546.0 km</Text>,
    ctas: {
      button: (
        <button>
          <Icons iconName="iconPhone"></Icons>
          Call
        </button>
      ),
      textButton: (
        <button>
          <Icons iconName="iconRedo"></Icons>Get directions
        </button>
      ),
    },
    address: {
      icon: <Icons iconName={'iconPin'}></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          Roman House, 296 Golders Green Road London NW11 9PY
        </Text>
      ),
    },
    phone: {
      icon: <Icons iconName="iconPhone"></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          020 3993 1861
        </Text>
      ),
    },
    openingHours: {
      icon: <Icons iconName="iconClock"></Icons>,
      text: (
        <>
          <Text variation="body-medium-large" tag="span">
            Open Now.
          </Text>
          <Text variation="body-medium" tag="span">
            Closes at 20:00
          </Text>
        </>
      ),
    },
    variation: 'stacked',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <div
          style={{
            background: 'var(--background)',
            padding: '1rem',
            minHeight: '100vh',
          }}
        >
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const SideBySide: StoryObj<typeof YextResultCardLocations> = {
  args: {
    ...Default.args,
    variation: 'side-by-side',
  },
  decorators: Default.decorators,
};
