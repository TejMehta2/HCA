import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';
import ContainerProps from './Container.types';

const mockProps: ContainerProps = {
  children: <button>Test</button>,
};

describe('Container', () => {
  it('Renders children from props', () => {
    const { getByText } = render(<Container {...mockProps} />);
    const buttonElement = getByText('Test');
    expect(buttonElement).toBeInTheDocument();
  });
});
