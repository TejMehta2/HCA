import React from 'react';
import { render } from '@testing-library/react';
import CardComparison from './CardComparison';
import { CardComparisonProps } from './CardComparison.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardComparisonProps = {
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
};

describe('CardComparison', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardComparison {...mockProps} />);
    expect(getByText('Flexible Care GP')).toBeVisible();
  });
});
