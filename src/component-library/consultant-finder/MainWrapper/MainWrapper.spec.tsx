import React from 'react';
import { render } from '@testing-library/react';
import MainWrapper from './MainWrapper';
import { MainWrapperProps } from './MainWrapper.types';

const mockProps: MainWrapperProps = {
  children: <p>Hello world</p>,
};

describe('MainWrapper', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<MainWrapper {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
