import React from 'react';
import { render } from '@testing-library/react';
import RichTextWrapper from './RichTextWrapper';
import { RichTextWrapperProps } from './RichTextWrapper.types';

const mockProps: RichTextWrapperProps = {
  children: <p>Hello world</p>,
};

describe('RichTextWrapper', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<RichTextWrapper {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
