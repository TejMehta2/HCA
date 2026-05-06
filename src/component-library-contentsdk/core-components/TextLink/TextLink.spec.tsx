import React from 'react';
import { render } from '@testing-library/react';
import TextLink from './TextLink';
import { TextLinkProps } from './TextLink.types';

const mockProps: TextLinkProps = {
  children: <p>Hello world</p>,
};

describe('TextLink', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextLink {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
