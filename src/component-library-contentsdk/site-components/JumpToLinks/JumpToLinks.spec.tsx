import React from 'react';
import { render } from '@testing-library/react';
import JumpToLinks from './JumpToLinks';
import { JumpToLinksProps } from './JumpToLinks.types';

const mockProps: JumpToLinksProps = {
  heading: <p>Heading</p>,
  children: <p>Children</p>,
};

describe('JumpToLinks', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<JumpToLinks {...mockProps} />);
    expect(getByText('Heading')).toBeVisible();
    expect(getByText('Children')).toBeVisible();
  });
});
