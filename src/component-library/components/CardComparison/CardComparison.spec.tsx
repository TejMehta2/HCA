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
      label: 'Specialised women&apos;s health clinics',
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
};

describe('CardComparison', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardComparison {...mockProps} />);
    expect(getByText('Flexible Care GP')).toBeVisible();
  });
});
