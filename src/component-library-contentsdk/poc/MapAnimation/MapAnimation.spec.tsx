import React from 'react';
import { render } from '@testing-library/react';
import MapAnimation from './MapAnimation';

describe('MapAnimation', () => {
  it('Renders component', async () => {
    const { getByText } = render(<MapAnimation />);
    expect(getByText('The widest range of locations in the UK')).toBeVisible();
  });
});
