import React from 'react';
import LocationMap from './LocationMap';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import CardMap from '../CardMap/CardMap';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LocationMap> = {
  title: 'components/LocationMap',
  component: LocationMap,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const locationExamples = [
  {
    title: 'The Harley Street Clinic',
    address: '35 Weymouth Street W1G 8BJ London',
    center: {
      lat: 51.52036,
      lng: -0.14797,
    },
  },
  {
    title: 'London Bridge Hospital',
    address: '27 Tooley Street London SE1 2PR',
    center: {
      lat: 51.506359,
      lng: -0.08786,
    },
  },
  {
    title: 'The Wellington Hospital',
    address: `Wellington Place St John's Wood NW8 9LE`,
    center: {
      lat: 51.53204,
      lng: -0.16985,
    },
  },
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof LocationMap> = {
  args: {
    apiKey: process.env.STORYBOOK_GOOGLE_MAPS_API_KEY || '',
    center: {
      lat: 51.5072,
      lng: 0.1276,
    },
    locations: locationExamples.map((example) => ({
      card: (hideCard) => (
        <CardMap
          title={
            <Text tag="h3" variation="heading-2">
              {example.title}
            </Text>
          }
          address={
            <Text tag="p" variation="body-large">
              {example.address}
            </Text>
          }
          ctas={{
            button1: (
              <a href="#">
                <span>
                  Learn <strong>more</strong>
                </span>
              </a>
            ),
            button2: (
              <a href="#">
                <span>
                  Get <strong>directions</strong>
                </span>
              </a>
            ),
            close: (
              <button onClick={hideCard}>
                <span>Close</span>
                <Icons iconName="iconCross" />
              </button>
            ),
          }}
        />
      ),
      center: example.center,
    })),
  },
  decorators: [
    (Story) => (
      <Themes theme={'K-HCA-Fern-20'}>
        <Story />
      </Themes>
    ),
  ],
};
