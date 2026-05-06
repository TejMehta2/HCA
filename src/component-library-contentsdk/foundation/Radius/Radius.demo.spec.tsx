import React from 'react';
import { render } from '@testing-library/react';
import Radius from './Radius.demo';
import { RadiusProps } from './Radius.demo.types';

const mockProps: RadiusProps = {};

describe('Radius', () => {
  it('Renders', async () => {
    const { getByTestId } = render(<Radius {...mockProps} />);
    expect(getByTestId('large')).toBeVisible();
    expect(getByTestId('medium')).toBeVisible();
    expect(getByTestId('small')).toBeVisible();
  });
});
