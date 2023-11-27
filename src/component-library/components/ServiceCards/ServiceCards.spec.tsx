import React from 'react';
import { render } from '@testing-library/react';
import ServiceCards from './ServiceCards';
import { ServiceCardsProps } from './ServiceCards.types';

const mockProps: ServiceCardsProps = {
  children: <p>Hello world</p>,
};

describe('ServiceCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ServiceCards {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
