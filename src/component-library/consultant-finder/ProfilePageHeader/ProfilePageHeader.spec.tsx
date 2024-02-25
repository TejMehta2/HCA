import React from 'react';
import { render } from '@testing-library/react';
import ProfilePageHeader from './ProfilePageHeader';
import { ProfilePageHeaderProps } from './ProfilePageHeader.types';

const mockProps: ProfilePageHeaderProps = {
  children: <p>Hello world</p>,
};

describe('ProfilePageHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ProfilePageHeader {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
