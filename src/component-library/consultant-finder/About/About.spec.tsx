import React from 'react';
import { render } from '@testing-library/react';
import About from './About';
import { AboutProps } from './About.types';

const mockProps: AboutProps = {
  children: <p>Hello world</p>,
};

describe('About', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<About {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
