import React from 'react';
import { render } from '@testing-library/react';
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
  it('Renders', async () => {
    const { container } = render(<VideoPlayer {...mockProps} />);
    expect(container.getElementsByClassName('player').length).toBe(1);
  });
});
