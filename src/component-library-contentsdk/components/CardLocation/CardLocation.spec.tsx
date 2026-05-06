import React from 'react';
import { render } from '@testing-library/react';
import CardLocation from './CardLocation';
import { CardLocationProps } from './CardLocation.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardLocationProps = {
  quantity: (
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

describe('CardLocation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardLocation {...mockProps} />);
    expect(getByText('Locations across the UK')).toBeVisible();
  });
});
