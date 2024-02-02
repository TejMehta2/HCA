import React from 'react';
import { render } from '@testing-library/react';
import ScrollTransition from './ScrollTransition';
import { ScrollTransitionProps } from './ScrollTransition.types';

const mockProps: ScrollTransitionProps = {
  children: <p>Hello world</p>,
};

describe('ScrollTransition', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ScrollTransition {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
