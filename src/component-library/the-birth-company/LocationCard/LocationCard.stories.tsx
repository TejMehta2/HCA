import React from 'react';
import LocationCard from './LocationCard';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LocationCard> = {
  title: 'the-birth-company/LocationCard',
  component: LocationCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '363px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof LocationCard> = {
  args: {
    name: (
      <Text variation="body-bold-large" tag="p">
        Wimpole Street, London
      </Text>
    ),
    description: (
      <Text variation="body-small" tag="p">
        The Waterfront Business Park, Beaufort House, Elstree WD6 3BS
      </Text>
    ),
    children: (
      <span>
        <Icons iconName="iconClock" />
        <Text variation="body-small" tag="p">
          Available Sat 21 Oct 2023
        </Text>
      </span>
    ),
    handleClick: () => {},
  },
};

export const AppointmentType: StoryObj<typeof LocationCard> = {
  args: {
    contentVariation: 'appointmentType',
    name: (
      <Text variation="body-bold-large" tag="p">
        Sonographer
      </Text>
    ),
    description: (
      <Text variation="body-small" tag="p">
        Minim in ut fugiat in ullamco non excepteur ex ullamco in veniam nisi.
      </Text>
    ),
    children: (
      <>
        <span>
          <Icons iconName="iconClock" />
          <Text variation="body-small" tag="p">
            15 mins
          </Text>
        </span>
        <span>
          <Icons iconName="iconCreditCard" />
          <Text variation="body-small" tag="p">
            £50.99
          </Text>
        </span>
      </>
    ),
    handleClick: () => {},
  },
};
