import React from 'react';
import { render } from '@testing-library/react';
import CardLocation from './CardLocation';
import { CardLocationProps } from './CardLocation.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardLocationProps = {
  theme: 'j',
  title: (
    <Text tag="h3" variation="heading-1">
      The Harley Street Clinic
    </Text>
  ),
  address: (
    <Text tag="p" variation="body-large">
      35 Weymouth Street W1G 8BJ London
    </Text>
  ),
  distance: (
    <Text tag="p" variation="body-semi-bold-small">
      0.12 miles from your location
    </Text>
  ),
  ctas: {
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
  },
};

describe('CardLocation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardLocation {...mockProps} />);
    expect(getByText('The Harley Street Clinic')).toBeVisible();
  });
});
