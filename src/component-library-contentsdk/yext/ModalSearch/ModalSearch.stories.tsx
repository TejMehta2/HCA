import React from 'react';
import ModalSearch from './ModalSearch';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ModalSearch> = {
  title: 'yext/ModalSearch',
  component: ModalSearch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

const suggestions = [
  'How do I pay for treatment?',
  'Locations near me',
  'Operations & Covid 19',
  'Careers',
  'Neurology',
  'Where can I park?',
  'ENT',
  'How do I pay for treatment?',
  'Operations & Covid 19',
  'Careers',
  'Neurology',
  'Where can I park?',
  'ENT',
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ModalSearch> = {
  args: {
    id: 'SEARCH_SUGGESTIONS_MODAL_ID',
    placeholder: 'How can we help you?',
    subheading: <Text variation={'subheading-1'}>Popular searches</Text>,
    redirectUrl: '#',
    suggestions: suggestions.map((suggestion) => ({
      icon: <Icons iconName={'iconSearch'} />,
      text: <span>{suggestion}</span>,
      query: suggestion,
    })),

    defaultOpen: true,
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};
