import React from 'react';
import { render } from '@testing-library/react';
import LogoBlock from './LogoBlock';
import { LogoBlockProps } from './LogoBlock.types';

const mockProps: LogoBlockProps = {
  header: <p>Hello world</p>,
  logos: [<p key={0}>Logo</p>],
};

describe('LogoBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<LogoBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
    expect(getByText('Logo')).toBeVisible();
  });
});
