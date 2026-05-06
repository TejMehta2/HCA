import React from 'react';
import { render } from '@testing-library/react';
import PromoPiotr from './PromoPiotr';
import { PromoPiotrProps } from './PromoPiotr.types';

const mockProps: PromoPiotrProps = {
  children: <>children</>,
  image: <>image</>,
  richText: <>richText</>,
  link: <>link</>,
};

describe('PromoPiotr', () => {
  it('Renders props', async () => {
    const { getByText } = render(<PromoPiotr {...mockProps} />);
    expect(getByText('children')).toBeVisible();
    expect(getByText('richText')).toBeVisible();
  });
});
