import React from 'react';
import { render } from '@testing-library/react';
import MobileTabs from './MobileTabs';
import { MobileTabsProps } from './MobileTabs.types';

const mockProps: MobileTabsProps = {
  children: <p>Hello world</p>,
};

describe('MobileTabs', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<MobileTabs {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
