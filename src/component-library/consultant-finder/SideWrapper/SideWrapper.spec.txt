import React from 'react';
import { render } from '@testing-library/react';
import SideWrapper from './SideWrapper';
import { SideWrapperProps } from './SideWrapper.types';

const mockProps: SideWrapperProps = {
  children: <p>Hello world</p>,
};

describe('SideWrapper', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SideWrapper {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
