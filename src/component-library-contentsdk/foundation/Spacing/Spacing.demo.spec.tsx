import React from 'react';
import { render } from '@testing-library/react';
import Spacing from './Spacing.demo';
import { SpacingProps } from './Spacing.demo.types';

const mockProps: SpacingProps = {};

describe('Spacing', () => {
  it('Renders', async () => {
    const { getByText } = render(<Spacing {...mockProps} />);
    expect(getByText('Spacing 1')).toBeVisible();
  });
  it('has correct styles', async () => {
    const { getByText } = render(<Spacing {...mockProps} />);
    expect(getByText('Spacing 1')).toHaveStyle('padding: var(--spacing-1)');
    expect(getByText('Spacing 2')).toHaveStyle('padding: var(--spacing-2)');
  });
});
