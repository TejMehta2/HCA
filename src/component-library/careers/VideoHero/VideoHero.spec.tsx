import React from 'react';
import { render } from '@testing-library/react';
import VideoHero from './VideoHero';
import { VideoHeroProps } from './VideoHero.types';

const mockProps: VideoHeroProps = {
  title: <p>Hello world 1</p>,
  copy: <p>Hello world 2</p>,
  image: <p>Hello world 3 </p>,
  children: <p>Hello world 4</p>,
};

describe('VideoHero', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VideoHero {...mockProps} />);
    expect(getByText('Hello world 1')).toBeVisible();
  });
});
