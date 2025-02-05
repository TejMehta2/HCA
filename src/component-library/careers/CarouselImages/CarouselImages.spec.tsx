import React from 'react';
import { render } from '@testing-library/react';
import CarouselImages from './CarouselImages';
import { CarouselImagesProps } from './CarouselImages.types';

const mockProps: CarouselImagesProps = {
  children: <p>Hello world</p>,
};

describe('CarouselImages', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselImages {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
