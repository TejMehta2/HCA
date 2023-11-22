import React from 'react';
import { render } from '@testing-library/react';
import CarouselCards from './CarouselCards';
import { CarouselCardsProps } from './CarouselCards.types';

const mockProps: CarouselCardsProps = {
  children: <p>Hello world</p>,
};

describe('CarouselCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselCards {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
