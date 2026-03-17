import React from 'react';
import YextResultSectionLocations from './YextResultSectionLocationsVertical';
import type { Meta, StoryObj } from '@storybook/react';
import { Location } from './YextResultSectionLocations.types';
import { Default as CardDefault } from '../YextResultCardLocations/YextResultCardLocations.stories';
import { YextResultCardLocationsProps } from '../YextResultCardLocations/YextResultCardLocations.types';
import Numbers from '../../components/Numbers/Numbers';
import Themes from '../../foundation/Themes/Themes';
import YextResultCardLocations from '../YextResultCardLocations/YextResultCardLocations';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultSectionLocations> = {
  title: 'yext/YextResultSectionLocations',
  component: YextResultSectionLocations,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const cardPropsExample = CardDefault.args as YextResultCardLocationsProps;
const locations: Location[] = [
  {
    id: '1',
    card: (
      <YextResultCardLocations
        {...cardPropsExample}
        number={<Numbers number={<span>1</span>} />}
      />
    ),
    center: {
      lat: 51.52036,
      lng: -0.14797,
    },
  },
  {
    id: '2',
    card: (
      <YextResultCardLocations
        {...cardPropsExample}
        number={<Numbers number={<span>2</span>} />}
      />
    ),
    center: {
      lat: 51.506359,
      lng: -0.08786,
    },
  },
  {
    id: '3',
    card: (
      <YextResultCardLocations
        {...cardPropsExample}
        number={<Numbers number={<span>3</span>} />}
      />
    ),
    center: {
      lat: 51.53204,
      lng: -0.16985,
    },
  },
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextResultSectionLocations> = {
  args: {
    apiKey: process.env.STORYBOOK_GOOGLE_MAPS_API_KEY || '',
    center: {
      lat: 51.5072,
      lng: 0.1276,
    },
    locations,
    title: 'Locations',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export const SideBySide: StoryObj<typeof YextResultSectionLocations> = {
  args: {
    ...Default.args,
    variation: 'side-by-side',
  },
  decorators: Default.decorators,
};
