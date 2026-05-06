import React from 'react';
import { render } from '@testing-library/react';
import Tags from './Tags';
import { TagsProps } from './Tags.types';

const mockProps: TagsProps = {
  children: <a href="#">Hello world</a>,
};

describe('Tags', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Tags {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
