import React from 'react';
import { render } from '@testing-library/react';
import VideoBlock from './VideoBlock';
import { VideoBlockProps } from './VideoBlock.types';

const mockProps: VideoBlockProps = {
  children: <p>Hello world</p>,
};

describe('VideoBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VideoBlock {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
