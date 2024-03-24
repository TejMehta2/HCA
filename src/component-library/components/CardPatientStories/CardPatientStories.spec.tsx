import React from 'react';
import { render } from '@testing-library/react';
import CardPatientStories from './CardPatientStories';
import { CardPatientStoriesProps } from './CardPatientStories.types';

const mockProps: CardPatientStoriesProps = {
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

describe('CardPatientStories', () => {
  it('Renders card with props', async () => {
    const { getByText } = render(<CardPatientStories {...mockProps} />);
    expect(getByText('Every new birth tells its own story')).toBeVisible();
  });
});
