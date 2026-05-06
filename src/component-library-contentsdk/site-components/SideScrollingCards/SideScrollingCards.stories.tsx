import React from 'react';
import Image from 'next/image';
import SideScrollingCards from './SideScrollingCards';
import type { Meta, StoryObj } from '@storybook/react';
import CardPatientStories from '../../components/CardPatientStories/CardPatientStories';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SideScrollingCards> = {
  title: 'site-components/SideScrollingCards',
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
      <CardPatientStories
        key={0}
        title={
          <Text variation="display-4" tag="h2">
            Every new birth tells its own story
          </Text>
        }
        bodyCopy={
          <Text variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est
            exercitation aute sint tempor eu ut
          </Text>
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
        contentVariation="mixed"
      />,
      <CardPatientStories
        key={1}
        title={
          <Text variation="display-4" tag="h2">
            Every new birth tells its own story
          </Text>
        }
        bodyCopy={
          <Text variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est
            exercitation aute sint tempor eu ut
          </Text>
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
        contentVariation="mixed"
      />,
      <CardPatientStories
        key={2}
        title={
          <Text variation="display-4" tag="h2">
            Every new birth tells its own story
          </Text>
        }
        bodyCopy={
          <Text variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est
            exercitation aute sint tempor eu ut
          </Text>
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
        contentVariation="mixed"
      />,
      <CardPatientStories
        key={3}
        title={
          <Text variation="display-4" tag="h2">
            Every new birth tells its own story
          </Text>
        }
        bodyCopy={
          <Text variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est
            exercitation aute sint tempor eu ut
          </Text>
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
        contentVariation="mixed"
      />,
    ],
  },
};
