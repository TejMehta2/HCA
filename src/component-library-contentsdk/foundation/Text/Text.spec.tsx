import React from 'react';
import { render } from '@testing-library/react';
import Text from './Text';
import { TextProps } from './Text.types';

const mockProps: TextProps = {
  tag: 'h1',
  variation: 'display-1',
  children: 'Hello world',
};

describe('Text', () => {
  it('Renders text tag from props', async () => {
    const { getByText } = render(<Text {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });

  it('Renders with default props', async () => {
    const { getByText } = render(<Text>{mockProps.children}</Text>);
    expect(getByText('Hello world')).toBeVisible();
  });

  it('Renders with a <h1> tag', async () => {
    const { getByText } = render(<Text {...mockProps} />);
    expect(getByText('Hello world').tagName.toLowerCase()).toBe('h1');
  });
});
