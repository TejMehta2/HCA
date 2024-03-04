import React from 'react';
import { render } from '@testing-library/react';
import StyledYextSearchBar from './StyledYextSearchBar';
import { StyledYextSearchBarProps } from './StyledYextSearchBar.types';

const mockProps: StyledYextSearchBarProps = {
  placeholder: 'Hello world',
};

describe('StyledYextSearchBar', () => {
  it('Renders content from props', async () => {
    const { getByText } = render(<StyledYextSearchBar {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
