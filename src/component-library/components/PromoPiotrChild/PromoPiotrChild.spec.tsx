import React from 'react';
import { render } from '@testing-library/react';
import PromoPiotrChild from './PromoPiotrChild';
import { PromoPiotrChildProps } from './PromoPiotrChild.types';

const mockProps: PromoPiotrChildProps = {
  icon: <>icon</>,
  text: <>text</>,
  link: <>link</>,
  text2: <>text2</>,
};

describe('PromoPiotrChild', () => {
  it('Renders props', async () => {
    const { getByText } = render(<PromoPiotrChild {...mockProps} />);
    expect(getByText('text')).toBeVisible();
    expect(getByText('text2')).toBeVisible();
  });
});
