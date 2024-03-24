import React from 'react';
import CardGrid from './CardGrid';
import type { Meta, StoryObj } from '@storybook/react';
import CardContent from '../../components/CardContent/CardContent';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardGrid> = {
  title: 'site-components/CardGrid',
  component: CardGrid,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Themes theme={'D-HCA-Teal'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const defaultChildren = [];
for (let i = 0; i < 9; i++) {
  defaultChildren.push(
    <CardContent
      key={i}
      title={
        <Text variation="heading-1" tag="h4">
          Cardiac care
        </Text>
      }
      bodyCopy={
        <Text variation="body-large" tag="p">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
      }
      image={
        <Image
          src="/placeholders/multicard.jpg"
          alt="baby crying"
          width="363"
          height="243"
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
  );
}

export const Default: StoryObj<typeof CardGrid> = {
  args: {
    children: defaultChildren,
  },
};

export const TwoCards: StoryObj<typeof CardGrid> = {
  args: {
    children: [
      <CardContent
        key={0}
        title={
          <Text variation="heading-1" tag="h4">
            Cardiac care
          </Text>
        }
        bodyCopy={
          <Text variation="body-large" tag="p">
            There are over 1400 at The Portland, each year. Hear new mums
            sharing theirs
          </Text>
        }
        image={
          <Image
            src="/placeholders/multicard.jpg"
            alt="baby crying"
            width="363"
            height="243"
          />
        }
        link={
          <a href="#">
            <span>
              Read the <strong>Story</strong>
            </span>
          </a>
        }
      />,
      <CardContent
        key={1}
        title={
          <Text variation="heading-1" tag="h4">
            Cardiac care
          </Text>
        }
        bodyCopy={
          <Text variation="body-large" tag="p">
            There are over 1400 at The Portland, each year. Hear new mums
            sharing theirs
          </Text>
        }
        image={
          <Image
            src="/placeholders/multicard.jpg"
            alt="baby crying"
            width="363"
            height="243"
          />
        }
        link={
          <a href="#">
            <span>
              Read the <strong>Story</strong>
            </span>
          </a>
        }
      />,
    ],
  },
};

const noImageChildren = [];
for (let i = 0; i < 9; i++) {
  noImageChildren.push(
    <CardContent
      key={i}
      title={
        <Text variation="heading-1" tag="h4">
          Abdominal hysterectomy
        </Text>
      }
      bodyCopy={
        <Text variation="body-large" tag="p">
          The Harley Street Clinic retain CQC Outstanding rating
        </Text>
      }
      link={
        <a href="#">
          <span>
            Learn <strong>More</strong>
          </span>
        </a>
      }
    />
  );
}

export const NoImage: StoryObj<typeof CardGrid> = {
  args: {
    children: noImageChildren,
  },
};

const noBodyChildren = [];
for (let i = 0; i < 9; i++) {
  noBodyChildren.push(
    <CardContent
      key={i}
      title={
        <Text variation="heading-1" tag="h4">
          Abdominal hysterectomy
        </Text>
      }
      link={
        <a href="#">
          <span>
            Learn <strong>More</strong>
          </span>
        </a>
      }
    />
  );
}

export const NoBody: StoryObj<typeof CardGrid> = {
  args: {
    children: noBodyChildren,
  },
};
