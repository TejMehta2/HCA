import React from 'react';
import { render } from '@testing-library/react';
import TextBlockContainer from './TextBlockContainer';
import { TextBlockContainerProps } from './TextBlockContainer.types';

const mockProps: TextBlockContainerProps = {
  children: <p>Hello world</p>,
};

describe('TextBlockContainer', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextBlockContainer {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
