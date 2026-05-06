import React from 'react';
import { render } from '@testing-library/react';
import YextResultSectionLocationsAdaptor from './YextResultSectionLocations.adaptor';

describe('YextResultSectionLocations', () => {
  it('Renders', async () => {
    const { getByText } = render(<YextResultSectionLocationsAdaptor />);
    expect(
      getByText('Golders Green Outpatients and Diagnostics Centre')
    ).toBeVisible();
  });
});
