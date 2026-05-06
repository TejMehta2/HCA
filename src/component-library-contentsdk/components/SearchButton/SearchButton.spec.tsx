import React from 'react';
import { render } from '@testing-library/react';
import SearchButton from './SearchButton';
import { SearchButtonProps } from './SearchButton.types';

const mockProps: SearchButtonProps = {
  children: <p>Hello world</p>,
  onClick: () => {},
};

describe('SearchButton', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchButton {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
