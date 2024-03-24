import React from 'react';
import CardDoctorLayout from './CardDoctorLayout';
import type { Meta, StoryObj } from '@storybook/react';
import CardDoctor from '../CardDoctor/CardDoctor';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardDoctorLayout> = {
  title: 'components/CardDoctorLayout',
  component: CardDoctorLayout,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardDoctorLayout> = {
  args: {
    title: (
      <Text variation="display-3" tag="h2">
        Hip pain consultants
      </Text>
    ),
    children: [
      <CardDoctor
        key={0}
        image={
          <Image
            src="/placeholders/doctor-portrait-circle.png"
            alt="doctor portrait"
            width="91"
            height="91"
          />
        }
        title={
          <Text variation="display-5" tag="h3">
            John Smith
          </Text>
        }
        department={<span>Orthopaedics</span>}
        cta={
          <a href="#">
            <span>
              View <strong>profile</strong>
            </span>
          </a>
        }
      />,
      <CardDoctor
        key={1}
        image={
          <Image
            src="/placeholders/doctor-portrait-circle.png"
            alt="doctor portrait"
            width="91"
            height="91"
          />
        }
        title={
          <Text variation="display-5" tag="h2">
            John Smith
          </Text>
        }
        department={<span>Orthopaedics</span>}
        cta={
          <a href="#">
            <span>
              View <strong>profile</strong>
            </span>
          </a>
        }
      />,
      <CardDoctor
        key={2}
        image={
          <Image
            src="/placeholders/doctor-portrait-circle.png"
            alt="doctor portrait"
            width="91"
            height="91"
          />
        }
        title={
          <Text variation="display-5" tag="h2">
            John Smith
          </Text>
        }
        department={<span>Orthopaedics</span>}
        cta={
          <a href="#">
            <span>
              View <strong>profile</strong>
            </span>
          </a>
        }
      />,
      <CardDoctor
        key={3}
        image={
          <Image
            src="/placeholders/doctor-portrait-circle.png"
            alt="doctor portrait"
            width="91"
            height="91"
          />
        }
        title={
          <Text variation="display-5" tag="h2">
            John Smith
          </Text>
        }
        department={<span>Orthopaedics</span>}
        cta={
          <a href="#">
            <span>
              View <strong>profile</strong>
            </span>
          </a>
        }
      />,
    ],
    cta: (
      <a href="#">
        <span>
          View all <strong>hip pain consultants</strong>
        </span>
      </a>
    ),
    theme: 'D-HCA-Teal',
  },
};
