import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import { VideoPlayerProps } from './VideoPlayer.types';
import Image from 'next/image';

const mockProps: VideoPlayerProps = {
  videoUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
  overlayImage: (
    <Image
      src="/placeholders/london.jpg"
      alt="london skyline"
      width="1120"
      height="631"
    />
  ),
};

describe('VideoPlayer', () => {
  test('VideoPlayer must have src and alt"', () => {
    render(<VideoPlayer {...mockProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fplaceholders%2Flondon.jpg&w=3840&q=75'
    );
    expect(image).toHaveAttribute('alt', 'london skyline');
  });
});
