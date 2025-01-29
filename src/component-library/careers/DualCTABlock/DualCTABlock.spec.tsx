import React from 'react';
import { render } from '@testing-library/react';
import DualCTABlock from './DualCTABlock';
import { DualCTABlockProps } from './DualCTABlock.types';

const mockProps: DualCTABlockProps = {
  children: <p>Hello world</p>,
};

describe('DualCTABlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<DualCTABlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
