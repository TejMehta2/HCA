import React from 'react';
import { render } from '@testing-library/react';
import CQCBlock from './CQCBlock';
import { CQCBlockProps } from './CQCBlock.types';

const mockProps: CQCBlockProps = {
  children: <p>Hello world</p>,
};

describe('CQCBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CQCBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
