import React from 'react';
import { render } from '@testing-library/react';
import CardMap from './CardMap';
import { CardMapProps } from './CardMap.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardMapProps = {
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
    <Text tag="p" variation="body-bold-small">
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

describe('CardMap', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardMap {...mockProps} />);
    expect(getByText('The Harley Street Clinic')).toBeVisible();
  });
});
