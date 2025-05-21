import React from 'react';
import CardComparison from './CardComparison';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardComparison> = {
  title: 'components/CardComparison',
  component: CardComparison,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardComparison> = {
  args: {
    title: (
      <Text variation="display-5" tag="h3">
        Flexible Care GP
      </Text>
    ),
    description: (
      <Text variation="body-large" tag="p">
        GP subscription suitable for all ages
      </Text>
    ),
    featuresLabel: (
      <Text variation="body-bold-extra-large" tag="p">
        Features
      </Text>
    ),
    pricingVariants: [
      {
        price: '£23',
        period: '/ month',
      },
      {
        price: '£236',
        period: '/ year',
        discount: '-10%',
      },
    ],
    includedPackageItems: [
      {
        label: 'Unlimited GP consultations',
      },
      {
        label:
          '50% discount on initial consultation at HCA UK Urgent Care Centres',
        info: 'additional tooltip info',
      },
    ],
    excludedPackageItems: [
      {
        label: 'Travel & Vaccination advice',
      },
      {
        label: 'Prescription services',
        info: 'additional tooltip info',
      },

      {
        label: 'Annual reAssure I health screen',
        summary: 'worth £326',
      },
      {
        label: 'Annual flu vaccination',
      },
    ],
    cta: (
      <a href="#">
        <span>Get started</span>
      </a>
    ),
    tag: 'Most popular',
    // tagVariant: true,
  },
  decorators: [
    (Story) => (
      <Themes theme={'J-HCA-Tangerine-20'}>
        <div style={{ backgroundColor: 'var(--background)', padding: '1rem' }}>
          <div style={{ maxWidth: '551px', margin: 'auto' }}>
            <Story />
          </div>
        </div>
      </Themes>
    ),
  ],
};
