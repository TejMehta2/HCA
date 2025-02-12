import React from 'react';
import RoleCards from './RoleCards';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import CardRole from '../CardRole/CardRole';
import Image from 'next/image';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RoleCards> = {
  title: 'careers/RoleCards',
  component: RoleCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <>
        <Themes theme={'A-HCA-White'}>
          <Story />
        </Themes>
      </>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof RoleCards> = {
  args: {
    title: (
      <Text variation="display-2">
        Find your role in transforming patient care
      </Text>
    ),
    subtitle: <Text variation="subheading-1">Where do you fit in?</Text>,
    bodyText: (
      <Text>
        Delivering quality patient care and innovative treatments is achieved
        through diverse people working in diverse roles, which means
        there&apos;s a good chance we&apos;ll have an opportunity to suit you.
      </Text>
    ),
    children: [
      <CardRole
        key={0}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Nursing & Front Line Clinical Services
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={1}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Theatres
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={2}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Midwives & Front Line Clinical Services
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={3}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            GP Services
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={4}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Pharmacy & Allied Healthcare Professionals
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={5}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Hospital Management & Head Office
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={6}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Patient Support Services
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={7}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Information Technology Group
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={8}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            Hotel Services
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
      <CardRole
        key={9}
        image={
          <Image
            src="/placeholders/smiling-doctor.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        }
        icon={<Icons iconName="iconHospitalLarge" />}
        title={
          <Text variation="heading-2" tag="h4">
            EHR Transformation
          </Text>
        }
        cta={
          <Button size="small" variation="full">
            <a href="#">
              <span>
                <Icons iconName="iconArrowSmallRight" />
              </span>
            </a>
          </Button>
        }
      />,
    ],
  },
};
