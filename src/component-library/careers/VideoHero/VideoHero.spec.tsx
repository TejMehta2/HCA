import React from 'react';
import { render } from '@testing-library/react';
import VideoHero from './VideoHero';
import { VideoHeroProps } from './VideoHero.types';

const mockProps: VideoHeroProps = {
  children: <p>Hello world</p>,
};

describe('VideoHero', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<VideoHero {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
