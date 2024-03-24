import React from 'react';
import { render } from '@testing-library/react';
import BlogContent from './BlogContent';
import { BlogContentProps } from './BlogContent.types';

const mockProps: BlogContentProps = {
  theme: 'A-HCA-White',
  children: (
    <p>
      London Bridge Hospital, part of HCA Healthcare UK, has once again been
      rated as &quot;Outstanding&quot; by the Care Quality Commission (CQC),
      following a recent inspection. London Bridge Hospital has held its
      Outstanding rating since 2016.
    </p>
  ),
};

describe('BlogContent', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<BlogContent {...mockProps} />);
    expect(getByText('London Bridge Hospital')).toBeVisible();
  });
});
