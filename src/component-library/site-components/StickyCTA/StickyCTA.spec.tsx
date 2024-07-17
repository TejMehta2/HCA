import React from 'react';
import { render } from '@testing-library/react';
import StickyCTA from './StickyCTA';
import { StickyCTAProps } from './StickyCTA.types';

const mockProps: StickyCTAProps = {
  children: <p>Hello world</p>,
};

describe('StickyCTA', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<StickyCTA {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
