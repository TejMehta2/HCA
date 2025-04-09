import React from 'react';
import StatsCards from './StatsCards';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StatsCards> = {
  title: 'careers/StatsCards',
  component: StatsCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ThreeCards: StoryObj<typeof StatsCards> = {
  args: {
    theme: 'K-HCA-Fern-20',
    header: (
      <Text tag="h2" variation="display-2">
        Let our numbers speak for themselves.
      </Text>
    ),
    bodyCopy: (
      <Text tag="p" variation="body-large">
        Life with us means taking pride in your team and delivering the highest
        quality care. We&apos;ll support your ongoing learning in an environment
        that features advanced equipment and practices, one of the best
        colleague-to-patient ratios in the UK and varied, interesting work. As
        part of HCA US, one of the nation&apos;s leading providers of healthcare
        services, we can also promise that you&apos;ll learn from experts in
        every department and that your opportunities will be endless. With us,
        you&apos;ll be empowered to achieve more in your career, and more for
        our patients.
      </Text>
    ),
    stats: [
      { stat: '26', text: 'operating theatres' },
      { stat: '888', text: 'registered beds' },
      { stat: '888', text: 'registered beds' },
    ],
  },
};

export const FourCards: StoryObj<typeof StatsCards> = {
  args: {
    theme: 'K-HCA-Fern-20',
    header: (
      <Text tag="h2" variation="display-2">
        Let our numbers speak for themselves.
      </Text>
    ),
    bodyCopy: (
      <Text tag="p" variation="body-large">
        Life with us means taking pride in your team and delivering the highest
        quality care. We&apos;ll support your ongoing learning in an environment
        that features advanced equipment and practices, one of the best
        colleague-to-patient ratios in the UK and varied, interesting work. As
        part of HCA US, one of the nation&apos;s leading providers of healthcare
        services, we can also promise that you&apos;ll learn from experts in
        every department and that your opportunities will be endless. With us,
        you&apos;ll be empowered to achieve more in your career, and more for
        our patients.
      </Text>
    ),
    stats: [
      { stat: '26', text: 'operating theatres' },
      { stat: '125', text: 'critical care (ITU) beds' },
      { stat: '888', text: 'registered beds' },
      { stat: '26k', text: 'inpatients' },
    ],
  },
};

export const FiveCards: StoryObj<typeof StatsCards> = {
  args: {
    theme: 'K-HCA-Fern-20',
    header: (
      <Text tag="h2" variation="display-2">
        Let our numbers speak for themselves.
      </Text>
    ),
    bodyCopy: (
      <Text tag="p" variation="body-large">
        Life with us means taking pride in your team and delivering the highest
        quality care. We&apos;ll support your ongoing learning in an environment
        that features advanced equipment and practices, one of the best
        colleague-to-patient ratios in the UK and varied, interesting work. As
        part of HCA US, one of the nation&apos;s leading providers of healthcare
        services, we can also promise that you&apos;ll learn from experts in
        every department and that your opportunities will be endless. With us,
        you&apos;ll be empowered to achieve more in your career, and more for
        our patients.
      </Text>
    ),
    stats: [
      { stat: '26', text: 'operating theatres' },
      { stat: '125', text: 'critical care (ITU) beds' },
      { stat: '888', text: 'registered beds' },
      { stat: '26k', text: 'inpatients' },
      { stat: '64k', text: 'day cases' },
    ],
  },
};

export const SixCards: StoryObj<typeof StatsCards> = {
  args: {
    theme: 'K-HCA-Fern-20',
    header: (
      <Text tag="h2" variation="display-2">
        Let our numbers speak for themselves.
      </Text>
    ),
    bodyCopy: (
      <Text tag="p" variation="body-large">
        Life with us means taking pride in your team and delivering the highest
        quality care. We&apos;ll support your ongoing learning in an environment
        that features advanced equipment and practices, one of the best
        colleague-to-patient ratios in the UK and varied, interesting work. As
        part of HCA US, one of the nation&apos;s leading providers of healthcare
        services, we can also promise that you&apos;ll learn from experts in
        every department and that your opportunities will be endless. With us,
        you&apos;ll be empowered to achieve more in your career, and more for
        our patients.
      </Text>
    ),
    stats: [
      { stat: '26', text: 'operating theatres' },
      { stat: '125', text: 'critical care (ITU) beds' },
      { stat: '888', text: 'registered beds' },
      { stat: '26k', text: 'inpatients' },
      { stat: '64k', text: 'day cases' },
      { stat: '125', text: 'critical care (ITU) beds' },
    ],
  },
};
