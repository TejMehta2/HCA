import React from 'react';
import { render } from '@testing-library/react';
import CardLocation from './CardLocation';
import { CardLocationProps } from './CardLocation.types';

const mockProps: CardLocationProps = {
  children: <p>Hello world</p>,
};

describe('CardLocation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardLocation {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
