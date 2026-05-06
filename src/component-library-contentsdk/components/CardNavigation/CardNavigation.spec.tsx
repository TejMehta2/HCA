import React from 'react';
import { render } from '@testing-library/react';
import CardNavigation from './CardNavigation';
import { CardNavigationProps } from './CardNavigation.types';
import Text from '../../foundation/Text/Text';

const mockProps: CardNavigationProps = {
  title: (
    <Text tag="p" variation="heading-2">
      Featured Scan
    </Text>
  ),
  body: (
    <Text tag="p" variation="body-medium">
      Ea et ea voluptate culpa laborum qui. Enim eiusmod qui ullamco aute anim.
    </Text>
  ),
  cta: (
    <a href="#">
      <span>
        Learn <strong>more</strong>
      </span>
    </a>
  ),
  date: (
    <Text tag="p" variation="body-medium-medium">
      Sept 7, 2023
    </Text>
  ),
  tag: <a href="#">Blog</a>,
};

describe('CardNavigation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardNavigation {...mockProps} />);
    expect(getByText('Featured Scan')).toBeVisible();
  });
});
