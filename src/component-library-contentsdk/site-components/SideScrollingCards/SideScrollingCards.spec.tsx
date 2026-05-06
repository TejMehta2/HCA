import React from 'react';
import Image from 'next/image';
import { render } from '@testing-library/react';
import SideScrollingCards from './SideScrollingCards';
import { SideScrollingCardsProps } from './SideScrollingCards.types';
import CardPatientStories from '../../components/CardPatientStories/CardPatientStories';
import Icons from '../../foundation/Icons/Icons';

const mockProps: SideScrollingCardsProps = {
  title: <span>Stories from our patients</span>,
  bodyCopy: (
    <span>
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum
      et culpa minim.
    </span>
  ),
  link: (
    <a href="#">
      <Icons iconName="iconSearch" />
      <span>
        Search <strong>all stories</strong>
      </span>
    </a>
  ),
  children: [
    <React.Fragment key={1}>
      <CardPatientStories
        key={1}
        title={<span>Every new birth tells its own story</span>}
        bodyCopy={
          <span>
            Quis laboris proident sint amet id cillum do dolor in tempor est
            exercitation aute sint tempor eu ut
          </span>
        }
        image={
          <Image
            src="/placeholders/crying-baby.png"
            alt="baby crying"
            width="456"
            height="253"
          />
        }
        link={
          <a href="#">
            <span>
              Read the <strong>Story</strong>
            </span>
          </a>
        }
      />
    </React.Fragment>,
  ],
};

describe('SideScrollingCards', () => {
  it('Renders side scrolling component from props', async () => {
    window.scrollTo = jest.fn();
    const { getByText } = render(<SideScrollingCards {...mockProps} />);
    expect(getByText('Stories from our patients')).toBeVisible();
  });
});
