import React from 'react';
import { render } from '@testing-library/react';
import IconCtaBlock from './IconCtaBlock';
import { IconCtaBlockProps } from './IconCtaBlock.types';

const mockProps: IconCtaBlockProps = {
  children: <p>Hello world</p>,
};

describe('IconCtaBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<IconCtaBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
