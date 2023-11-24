import React from 'react';
import Image from 'next/image';
import CarouselCards from './CarouselCards';
import type { Meta, StoryObj } from '@storybook/react';
import CardPatientStories from '../CardPatientStories/CardPatientStories';
import CardBlog from '../CardBlog/CardBlog';
import Text from '../../foundation/Text/Text';
import Tags from '../../core-components/Tags/Tags';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CarouselCards> = {
  title: 'components/CarouselCards',
  component: CarouselCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PatientStoryCards: StoryObj<typeof CarouselCards> = {
  args: {
    title: <span>Orthopaedics Patient Stories</span>,
    link: (
      <a href="#">
        <span>
          View all <strong>patient stories</strong>
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
      </React.Fragment>,
    ],
  },
};

export const BlogCards: StoryObj<typeof CarouselCards> = {
  args: {
    title: <span>Orthopaedic Care</span>,
    link: (
      <a href="#">
        <span>
          View <strong>all</strong>
        </span>
      </a>
    ),
    children: [
      <React.Fragment key={1}>
        <CardBlog>
          <>
            <Image
              src="/image-and-text-component-placeholder.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
            <Text variation="heading-2" tag="h3">
              <a href="#">
                The Harley Street Clinic retain CQC &apos;Outstanding&apos;
                rating
              </a>
            </Text>
            <Text variation="body-large">
              There are over 1400 at The Portland, each year. Hear new mums
              sharing theirs
            </Text>
            <Tags>
              <a href="#">Announcement</a>
            </Tags>
          </>
        </CardBlog>
        <CardBlog>
          <>
            <Image
              src="/image-and-text-component-placeholder.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
            <Text variation="heading-2" tag="h3">
              <a href="#">
                The Harley Street Clinic retain CQC &apos;Outstanding&apos;
                rating
              </a>
            </Text>
            <Text variation="body-large">
              There are over 1400 at The Portland, each year. Hear new mums
              sharing theirs
            </Text>
            <Tags>
              <a href="#">Announcement</a>
            </Tags>
          </>
        </CardBlog>
        <CardBlog>
          <>
            <Image
              src="/image-and-text-component-placeholder.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
            <Text variation="heading-2" tag="h3">
              <a href="#">
                The Harley Street Clinic retain CQC &apos;Outstanding&apos;
                rating
              </a>
            </Text>
            <Text variation="body-large">
              There are over 1400 at The Portland, each year. Hear new mums
              sharing theirs
            </Text>
            <Tags>
              <a href="#">Announcement</a>
            </Tags>
          </>
        </CardBlog>
        <CardBlog>
          <>
            <Image
              src="/image-and-text-component-placeholder.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
            <Text variation="heading-2" tag="h3">
              <a href="#">
                The Harley Street Clinic retain CQC &apos;Outstanding&apos;
                rating
              </a>
            </Text>
            <Text variation="body-large">
              There are over 1400 at The Portland, each year. Hear new mums
              sharing theirs
            </Text>
            <Tags>
              <a href="#">Announcement</a>
            </Tags>
          </>
        </CardBlog>
      </React.Fragment>,
    ],
  },
};
