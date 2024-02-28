import React from 'react';
import { render } from '@testing-library/react';
import LoaderCF from './LoaderCF';
import { LoaderCFProps } from './LoaderCF.types';

const mockProps: LoaderCFProps = {
  children: <p>Hello world</p>,
};

describe('LoaderCF', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<LoaderCF {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
