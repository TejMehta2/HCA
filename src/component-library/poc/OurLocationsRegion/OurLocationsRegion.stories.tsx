import OurLocationsRegion from './OurLocationsRegion';
import type { Meta, StoryObj } from '@storybook/react';
import MapEngland from '../../assets/locations/map-england.png';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OurLocationsRegion> = {
  title: 'poc/OurLocationRegion',
  component: OurLocationsRegion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof OurLocationsRegion> = {
  args: {
    id: 0,
    name: 'Locations across the UK',
    amount: '35',
    theme: 'B-HCA-Navy-Blue',
    area: { mobile: MapEngland },
    mapStyles: { transform: 'translateY(0) scale(1.1)' },
    cardStyles: { transform: 'translateY(-50%)' },
    activeRegion: true,
  },
};
