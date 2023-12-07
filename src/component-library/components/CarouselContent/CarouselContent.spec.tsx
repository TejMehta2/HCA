import React from 'react';
import { render } from '@testing-library/react';
import CarouselContent from './CarouselContent';
import { CarouselContentProps } from './CarouselContent.types';

const mockProps: CarouselContentProps = {
  children: <p>Hello world</p>,
};

describe('CarouselContent', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselContent {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
