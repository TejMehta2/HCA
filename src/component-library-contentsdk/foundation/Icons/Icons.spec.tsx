import React from 'react';
import { render } from '@testing-library/react';
import Icons from './Icons';

describe('Icons', () => {
  it('Renders', async () => {
    const { getByTestId } = render(<Icons iconName="iconCheck" />);
    expect(getByTestId('svg')).toBeVisible();
  });
});
