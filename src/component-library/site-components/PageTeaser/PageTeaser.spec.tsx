import React from 'react';
import { render } from '@testing-library/react';
import PageTeaser from './PageTeaser';
import { PageTeaserProps } from './PageTeaser.types';

const mockProps: PageTeaserProps = {
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

describe('PageTeaser', () => {
  it('Renders card with props', async () => {
    const { getByText } = render(<PageTeaser {...mockProps} />);
    expect(getByText('Every new birth tells its own story')).toBeVisible();
  });
});
