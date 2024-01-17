import React from 'react';
import { render } from '@testing-library/react';
import ShareCTA from './ShareCTA';
import { ShareCTAProps } from './ShareCTA.types';

const mockProps: ShareCTAProps = {
  children: <p>Hello world</p>,
};

describe('ShareCTA', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ShareCTA {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
