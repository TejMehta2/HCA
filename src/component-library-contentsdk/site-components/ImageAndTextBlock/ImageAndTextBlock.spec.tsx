import React from 'react';
import { render } from '@testing-library/react';
import ImageAndTextBlock from './ImageAndTextBlock';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

const mockProps: ImageAndTextBlockProps = {
  children: <p>Hello world</p>,
  header: (
    <Text tag="h2" variation="display-2">
      New to private healthcare?
    </Text>
  ),
  image: (
    <Image
      src="/placeholders/children-playing.jpg"
      alt="two children playing"
      width="643"
      height="605"
    />
  ),
  theme: 'D-HCA-Teal',
};

describe('ImageAndTextBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ImageAndTextBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
