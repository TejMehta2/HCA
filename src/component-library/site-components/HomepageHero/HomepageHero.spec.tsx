import React from 'react';
import { render } from '@testing-library/react';
import HomepageHero from './HomepageHero';
import { HomepageHeroProps } from './HomepageHero.types';

const mockProps: HomepageHeroProps = {
  children: <p>Hello world</p>,
};

describe('HomepageHero', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HomepageHero {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
