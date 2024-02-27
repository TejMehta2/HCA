import React from 'react';
import Image from 'next/image';
import { render, screen } from '@testing-library/react';
import CarouselCards from './CarouselCards';
import { CarouselCardsProps } from './CarouselCards.types';
import CardPatientStories from '../../components/CardPatientStories/CardPatientStories';

const mockProps: CarouselCardsProps = {
  theme: 'D-HCA-Teal',
  title: <span>Orthopaedics Patient Stories</span>,
  link: (
    <a href="#">
      <span>View all patient stories</span>
    </a>
  ),
  children: [
    <React.Fragment key={1}>
      <CardPatientStories
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
      <CardPatientStories
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
      <CardPatientStories
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

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('CarouselCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselCards {...mockProps} />);
    expect(getByText('Orthopaedics Patient Stories')).toBeVisible();
  });

  it('Renders cta', async () => {
    const { getByText } = render(<CarouselCards {...mockProps} />);
    expect(getByText('View all patient stories')).toBeVisible();
  });

  it('Renders correct amount of cards', async () => {
    render(<CarouselCards {...mockProps} />);
    const items = await screen.findAllByText(
      'Every new birth tells its own story'
    );
    expect(items).toHaveLength(3);
  });
});
