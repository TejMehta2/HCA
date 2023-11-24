import React from 'react';
import Image from 'next/image';
import SideScrollingCards from './SideScrollingCards';
import type { Meta, StoryObj } from '@storybook/react';
import CardPatientStories from '../CardPatientStories/CardPatientStories';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SideScrollingCards> = {
  title: 'components/SideScrollingCards',
  component: SideScrollingCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof SideScrollingCards> = {
  args: {
    title: <span>Stories from our patients</span>,
    bodyCopy: (
      <span>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim.
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
          title={<span>Every new birth tells its own story</span>}
          bodyCopy={
            <span>
              Quis laboris proident sint amet id cillum do dolor in tempor est
              exercitation aute sint tempor eu ut
            </span>
          }
          image={
            <Image
              src="/side-scrolling-placeholder.png"
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
          title={<span>2 Every new birth tells its own story</span>}
          bodyCopy={
            <span>
              Quis laboris proident sint amet id cillum do dolor in tempor est
              exercitation aute sint tempor eu ut
            </span>
          }
          image={
            <Image
              src="/side-scrolling-placeholder.png"
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
          title={<span>3 Every new birth tells its own story</span>}
          bodyCopy={
            <span>
              Quis laboris proident sint amet id cillum do dolor in tempor est
              exercitation aute sint tempor eu ut
            </span>
          }
          image={
            <Image
              src="/side-scrolling-placeholder.png"
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
          title={<span>4 Every new birth tells its own story</span>}
          bodyCopy={
            <span>
              Quis laboris proident sint amet id cillum do dolor in tempor est
              exercitation aute sint tempor eu ut
            </span>
          }
          image={
            <Image
              src="/side-scrolling-placeholder.png"
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
  },
};
