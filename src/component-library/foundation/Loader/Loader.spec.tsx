import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';
import { LoaderProps } from './Loader.types';

const mockProps: LoaderProps = {
  theme: 'light',
};

describe('Loader', () => {
  it('Renders', async () => {
    const { container } = render(<Loader {...mockProps} />);
    expect(container.getElementsByClassName('loader').length).toBe(1);
  });
});
