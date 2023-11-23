import React from 'react';
import { render } from '@testing-library/react';
import Doctify from './Doctify';
import { DoctifyProps } from './Doctify.types';

const mockProps: DoctifyProps = {
  children: <p>Hello world</p>,
};

describe('Doctify', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Doctify {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
