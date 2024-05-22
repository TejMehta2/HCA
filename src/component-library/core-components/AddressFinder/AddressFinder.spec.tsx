import React from 'react';
import { render } from '@testing-library/react';
import AddressFinder from './AddressFinder';

describe('AddressFinder', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(
      <AddressFinder
        render={() => (
          <>
            <p>Test</p>
          </>
        )}
        defaultStep="manual"
        findAddressEndpoint={''}
        splitAddressEndpoint={''}
      />
    );
    expect(getByText('Test')).toBeVisible();
  });
});
