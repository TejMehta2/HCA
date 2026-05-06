import React from 'react';
import ContactList from './ContactList';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ContactList> = {
  title: 'components/ContactList',
  component: ContactList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ContactList> = {
  args: {
    items: [
      {
        title: (
          <Text tag="h4" variation="subheading-2">
            Embassy team
          </Text>
        ),
        number: (
          <Text tag="p" variation="display-6">
            020 3131 5978
          </Text>
        ),
        icon: <Icons iconName="iconClock"></Icons>,
        openingHours: (
          <Text tag="p" variation="body-large">
            Monday to Friday 8am - 6pm
          </Text>
        ),
      },
      {
        title: (
          <Text tag="h4" variation="subheading-2">
            Internation team (agencies & insurers)
          </Text>
        ),
        number: (
          <Text tag="p" variation="display-6">
            020 3131 5978
          </Text>
        ),
        icon: <Icons iconName="iconClock"></Icons>,
        openingHours: (
          <Text tag="p" variation="body-large">
            Monday to Friday 8am - 6pm
          </Text>
        ),
      },
      {
        title: (
          <Text tag="h4" variation="subheading-2">
            Embassy team
          </Text>
        ),
        number: (
          <Text tag="p" variation="display-6">
            020 3131 5978
          </Text>
        ),
        icon: <Icons iconName="iconClock"></Icons>,
        openingHours: (
          <Text tag="p" variation="body-large">
            Monday to Friday 8am - 6pm
          </Text>
        ),
      },
      {
        title: (
          <Text tag="h4" variation="subheading-2">
            Internation team (agencies & insurers)
          </Text>
        ),
        number: (
          <Text tag="p" variation="display-6">
            020 3131 5978
          </Text>
        ),
        icon: <Icons iconName="iconClock"></Icons>,
        openingHours: (
          <Text tag="p" variation="body-large">
            Monday to Friday 8am - 6pm
          </Text>
        ),
      },
    ],
  },
  decorators: [
    (Story) => (
      <Themes theme="I-HCA-Goldenrod">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
