import React from 'react';
import { render } from '@testing-library/react';
import SidePanel from './SidePanel';
import { SidePanelProps } from './SidePanel.types';

const mockProps: SidePanelProps = {
  children: <p>Hello world</p>,
};

describe('SidePanel', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SidePanel {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
