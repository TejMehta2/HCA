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
    subtitle: (
      <Text variation="body-medium-extra-large" tag="p">
        All ages
      </Text>
    ),
    pricingVariants: [
      {
        price: '£22.99',
        period: 'per month',
      },
      {
        price: '£236',
        period: 'per year',
        discount: '-10%',
      },
    ],
    includedPackageItems: [
      {
        label: 'Unlimited GP consultations',
      },
      {
        label: '50% Urgent Care Centre consultations',
      },
      {
        label: "Specialised women's health clinics",
      },
    ],
    excludedPackageItems: [
      {
        label: 'Annual flu vaccination',
      },
      {
        label: 'Prescription services',
      },
      {
        label: 'Travel & Vaccination advice',
      },
      {
        label: 'Annual reAssure I health screen',
        summary: '(worth £326)',
        info: 'additional tooltip info',
      },
    ],
    cta: (
      <a href="#">
        <span>Choose Flexible Care GP</span>
      </a>
    ),
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
