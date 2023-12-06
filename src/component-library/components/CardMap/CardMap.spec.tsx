import React from 'react';
import { render } from '@testing-library/react';
import CardMap from './CardMap';
import { CardMapProps } from './CardMap.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardMapProps = {
  theme: 'e',
  amount: (
    <Text tag="p" variation="display-1">
      35
    </Text>
  ),
  title: (
    <Text tag="p" variation="heading-2">
      Locations across the UK
    </Text>
  ),
  cta: (
    <a href="#">
      <span>
        View <strong>all</strong>
      </span>
    </a>
  ),
};

describe('CardMap', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardMap {...mockProps} />);
    expect(getByText('Locations across the UK')).toBeVisible();
  });
});
