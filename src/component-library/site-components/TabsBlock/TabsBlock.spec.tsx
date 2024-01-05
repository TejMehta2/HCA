import React from 'react';
import { render } from '@testing-library/react';
import TabsBlock from './TabsBlock';
import { TabsBlockProps } from './TabsBlock.types';

const mockProps: TabsBlockProps = {
  children: <p>Hello world</p>,
};

describe('TabsBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TabsBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
