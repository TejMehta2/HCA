import React from 'react';
import { render } from '@testing-library/react';
import CardContent from './CardContent';
import { CardContentProps } from './CardContent.types';

const mockProps: CardContentProps = {
  image: <img src="https://picsum.photos/400/300" alt="dummy alt text" />,
  title: <span>Every new birth tells its own story</span>,
  bodyCopy: (
    <span>
      Quis laboris proident sint amet id cillum do dolor in tempor est
      exercitation aute sint tempor eu ut.
    </span>
  ),
  link: (
    <a href="#">
      <span>
        Read the <strong>Story</strong>
      </span>
    </a>
  ),
};

describe('CardContent', () => {
  it('Renders card with props', async () => {
    const { getByText } = render(<CardContent {...mockProps} />);
    expect(getByText('Every new birth tells its own story')).toBeVisible();
  });
});
