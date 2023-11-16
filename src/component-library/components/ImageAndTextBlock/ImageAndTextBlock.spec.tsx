import React from 'react';
import { render } from '@testing-library/react';
import ImageAndTextBlock from './ImageAndTextBlock';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';

const mockProps: ImageAndTextBlockProps = {
  children: <p>Hello world</p>,
};

describe('ImageAndTextBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ImageAndTextBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
