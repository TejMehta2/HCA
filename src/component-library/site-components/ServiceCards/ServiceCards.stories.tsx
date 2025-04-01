import React from 'react';
import ServiceCards from './ServiceCards';
import type { Meta, StoryObj } from '@storybook/react';

import CardService from '../../components/CardService/CardService';
import CardRole from '../../careers/CardRole/CardRole';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ServiceCards> = {
  title: 'site-components/ServiceCards',
  component: ServiceCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ServiceCards> = {
  args: {
    title: <Text variation="display-2">Exceptional care you can trust</Text>,
    subtitle: <Text variation="subheading-1">our departments</Text>,
    bodyText: (
      <Text>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </Text>
    ),
    cta: (
      <a href="#">
        <Icons iconName="iconSearch"></Icons>{' '}
        <span>
          Search all <strong>departments</strong>
        </span>
      </a>
    ),
    children: [
      <CardService link={<a href="#">Learn More</a>} key={1}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 1</Text>
      </CardService>,

      <CardService
        link={
          <a href="#">
            Learn more
            12344342142344542315345345234523454352345435345345342543534253453453454353425345345234
          </a>
        }
        key={2}
      >
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 2</Text>
      </CardService>,

      <CardService link={<a href="#">Learn More</a>} key={3}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 3</Text>
      </CardService>,

      <CardService link={<a href="#">Learn More</a>} key={4}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 4</Text>
      </CardService>,

      <CardService link={<a href="#">Learn More</a>} key={5}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 5</Text>
      </CardService>,
    ],
  },
};

export const RoleCards: StoryObj<typeof ServiceCards> = {
  args: {
    theme: 'A-HCA-White',
    contentVariation: 'role',
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
        icon={<Icons iconName="iconHospital48" />}
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
