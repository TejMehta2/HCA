import React from 'react';
import CarouselTestimonials from './CarouselTestimonials';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CarouselTestimonials> = {
  title: 'careers/CarouselTestimonials',
  component: CarouselTestimonials,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CarouselTestimonials> = {
  args: {
    theme: 'B-HCA-Navy-Blue',
    subtitle: (
      <Text tag="p" variation="subheading-1">
        testimonials
      </Text>
    ),
    title: (
      <Text tag="h2" variation="display-1">
        What our people have to say
      </Text>
    ),
    slides: [
      {
        image: (
          <Image
            src="/placeholders/doctor-inspecting-a-childs-arm.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
        ),
        thumbnail: (
          <Image
            src="/placeholders/doctor-inspecting-a-childs-arm.jpg"
            alt="two children playing"
            width="80"
            height="80"
          />
        ),
        body: (
          <Text tag="p" variation="body-large">
            “At HCA UK, you have everything you need to deliver brilliant
            patient care in an inspiring environment- and we&apos;re always
            looking for ways to push the boundaries.
            <br />
            <br />
            There&apos;s a real focus on giving you the opportunities you need
            to follow your interests and progress quickly. My career journey is
            a good example of that.
            <br />
            <br />I really appreciate that I get to work so closely with
            clinical and non-clinical experts. As nurses, we have fantastic
            access to renowned consultants and other highly-skilled
            specialists.”
          </Text>
        ),
        name: (
          <Text tag="p" variation="body-bold-extra-large">
            Heidi
          </Text>
        ),
        role: (
          <Text tag="p" variation="body-medium">
            Chief Nursing Officer, HCA UK at UCH
          </Text>
        ),
      },
      {
        image: (
          <Image
            src="/placeholders/masonry-2.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
        ),
        thumbnail: (
          <Image
            src="/placeholders/masonry-2.jpg"
            alt="two children playing"
            width="80"
            height="80"
          />
        ),
        body: (
          <Text tag="p" variation="body-large">
            “2 At HCA UK, you have everything you need to deliver brilliant
            patient care in an inspiring environment- and we&apos;re always
            looking for ways to push the boundaries.
          </Text>
        ),
        name: (
          <Text tag="p" variation="body-bold-extra-large">
            Heidi 2
          </Text>
        ),
        role: (
          <Text tag="p" variation="body-medium">
            Chief Nursing Officer, HCA UK at UCH 2
          </Text>
        ),
      },
      {
        image: (
          <Image
            src="/placeholders/masonry-2.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
        ),
        thumbnail: (
          <Image
            src="/placeholders/masonry-2.jpg"
            alt="two children playing"
            width="80"
            height="80"
          />
        ),
        body: (
          <Text tag="p" variation="body-large">
            “At HCA UK, you have everything you need to deliver brilliant
            patient care in an inspiring environment- and we&apos;re always
            looking for ways to push the boundaries.
            <br />
            <br />
            There&apos;s a real focus on giving you the opportunities you need
            to follow your interests and progress quickly. My career journey is
            a good example of that.
            <br />
            <br />I really appreciate that I get to work so closely with
            clinical and non-clinical experts. As nurses, we have fantastic
            access to renowned consultants and other highly-skilled
            specialists.”
          </Text>
        ),
        name: (
          <Text tag="p" variation="body-bold-extra-large">
            Linda
          </Text>
        ),
        role: (
          <Text tag="p" variation="body-medium">
            Chief Nursing Officer, HCA UK at UCH 2
          </Text>
        ),
      },
    ],
  },
};
