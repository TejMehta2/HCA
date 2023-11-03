import React from 'react';
import { render } from '@testing-library/react';
import SideScrolling from './SideScrolling';

describe('SideScrolling', () => {
  it('Renders component', async () => {
    const { getByText } = render(<SideScrolling />);
    expect(getByText('Stories from our patients')).toBeVisible();
  });
});
