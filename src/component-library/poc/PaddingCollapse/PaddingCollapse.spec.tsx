import React from 'react';
import { render } from '@testing-library/react';
import PaddingCollapse from './PaddingCollapse';
import { PaddingCollapseProps } from './PaddingCollapse.types';

const mockProps: PaddingCollapseProps = {
  children: <p>Hello world</p>,
};

describe('PaddingCollapse', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<PaddingCollapse {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
