import React from 'react';
import { render } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import { VideoPlayerProps } from './VideoPlayer.types';

const mockProps: VideoPlayerProps = {
  children: <p>Hello world</p>,
};

describe('VideoPlayer', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VideoPlayer {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
