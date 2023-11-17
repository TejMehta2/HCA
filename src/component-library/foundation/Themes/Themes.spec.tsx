import React from 'react';
import { render } from '@testing-library/react';
import Themes from './Themes';
import { ThemesProps } from './Themes.types';

const mockProps: ThemesProps = {
  theme: 'a',
  children: <p>Hello world</p>,
};

describe('Themes', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Themes {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
