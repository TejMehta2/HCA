import React from 'react';
import { render } from '@testing-library/react';
import ProfilePageSection from './ProfilePageSection';
import { ProfilePageSectionProps } from './ProfilePageSection.types';

const mockProps: ProfilePageSectionProps = {
  children: <p>Hello world</p>,
};

describe('ProfilePageSection', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ProfilePageSection {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
