/* eslint-disable react/jsx-key */
import React from 'react';
import Navigation from './Navigation';
import type { Meta, StoryObj } from '@storybook/react';
import TextLink from '../../core-components/TextLink/TextLink';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import { TabContent } from './Navigation.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Navigation> = {
  title: 'site-components/Navigation',
  component: Navigation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    eyebrow: {
      control: false,
      table: {
        disable: true,
      },
    },
    tabs: {
      control: false,
      table: {
        disable: true,
      },
    },
    themeOpen: {
      control: false,
      table: {
        disable: true,
      },
    },
    themeClosed: {
      control: false,
      table: {
        disable: true,
      },
    },
    defaultTab: {
      control: false,
      table: {
        disable: true,
      },
    },
    search: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

const serviceCard: TabContent = {
  variation: 'single',
  template: 'Navigation Content Block',
  heading: <>Featured Scan</>,
  description: (
    <Text tag="p" variation="body-medium">
      Ea et ea voluptate culpa laborum qui. Enim eiusmod qui ullamco aute anim.
    </Text>
  ),
  cta: (
    <a href="#">
      <span>
        Learn <strong>more</strong>
      </span>
    </a>
  ),
};
const blogCard: TabContent = {
  template: 'Navigation Blog Post Card',
  heading: <a href="#">Test or scan related blog article</a>,
  description: (
    <Text tag="p" variation="body-medium">
      Ea et ea voluptate culpa laborum qui. Enim eiusmod qui ullamco aute anim.
    </Text>
  ),
  date: <time dateTime="Sept 7, 2023">Sept 7, 2023</time>,
  tag: <a href="#">Blog</a>,
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Navigation> = {
  args: {
    eyebrow: {
      left: (
        <>
          <TextLink variation="body-medium">
            <a href="#">For healthcare professionals</a>
          </TextLink>
          <TextLink variation="body-medium">
            <a href="#">For businesses</a>
          </TextLink>
          <TextLink variation="body-medium">
            <a href="#">Pay my bill</a>
          </TextLink>
        </>
      ),
      right: (
        <>
          <TextLink variation="body-medium">
            <a href="#">About HCA</a>
          </TextLink>
          <TextLink variation="body-medium">
            <a href="#">Careers</a>
          </TextLink>
        </>
      ),
    },
    tabs: [
      {
        heading: 'Service & Treatments',
        mobileTabCta: (
          <a href="#">
            <span>
              View all <strong>Service & Treatments</strong>
            </span>
          </a>
        ),
        content: [
          {
            template: 'Navigation Content Block',
            variation: 'double',
            heading: <>Services & Treatments</>,
            description: (
              <Text variation="body-large">
                Quis laboris proident sint amet id cillum do dolor in tempor
                est. Exercitation aute sint tempor eu ut aliquip commodo enim
                nulla et laborum et culpa minim.
              </Text>
            ),
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Services & Treatments</strong>
                </span>
              </a>
            ),
          },
          {
            template: 'Main Navigation Links List',
            variation: 'single-narrow',
            heading: <>Departments</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">Cancer Care</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Cardiac Care</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Neurosciences</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Orthopaedics</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Women’s Health</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Departments</strong>
                </span>
              </a>
            ),
          },
          {
            template: 'Main Navigation Links List',
            variation: 'single-narrow',
            heading: <>GP Services & Urgent Care</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">GP Services</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Health Screens</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Physiotherapy</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Urgent care</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>GP Services & Urgent Care</strong>
                </span>
              </a>
            ),
          },
          {
            template: 'Main Navigation Links List',
            variation: 'single-narrow',
            heading: <>Treatments</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">Cancer Care</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Cardiac Care</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Neurosciences</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Orthopaedics</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Women’s Health</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Treatments</strong>
                </span>
              </a>
            ),
          },
        ],
        hasChildren: true,
      },
      {
        heading: 'Tests & Scans',
        mobileTabCta: (
          <a href="#">
            <span>
              View all <strong>Tests & Scans</strong>
            </span>
          </a>
        ),
        content: [
          {
            template: 'Main Navigation Links List',
            variation: 'double',
            heading: <>Tests & Scans</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">CT Scans</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Echocardiogram</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">MRI Scan</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Ultrasound</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Bone Density scan</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Arthroscopy</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Mammogram</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Endoscopy</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Fertility diagnostics</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">ERCP</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Tests & Scans</strong>
                </span>
              </a>
            ),
          },
          serviceCard,
          blogCard,
        ],
        hasChildren: true,
      },
      {
        heading: 'Find a consultant',
        content: [],
        hasChildren: false,
        tabCta: <a href="#">Find a consultant</a>,
      },
      {
        heading: 'Find a location',
        mobileTabCta: (
          <a href="#">
            <span>
              View all <strong>Find a location</strong>
            </span>
          </a>
        ),
        content: [
          {
            template: 'Main Navigation Links List',
            variation: 'double',
            heading: <>Our locations</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">The Harley Street Clinic</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Lister Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">London Bridge Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Portland Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Wellington Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Wilmslow Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Christie Private Care</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Princess Grace Hospital</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Our locations</strong>
                </span>
              </a>
            ),
          },
          blogCard,
          blogCard,
        ],
        hasChildren: true,
      },
      {
        heading: 'Patient & Visitor Information',
        mobileTabCta: (
          <a href="#">
            <span>
              View all <strong>Patient & Visitor Information</strong>
            </span>
          </a>
        ),
        content: [
          {
            template: 'Main Navigation Links List',
            variation: 'single-wide',
            heading: <>Patient Information</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">The Harley Street Clinic</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Lister Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">London Bridge Hospital</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">The Portland Hospital</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Patient Information</strong>
                </span>
              </a>
            ),
          },
          {
            template: 'Main Navigation Links List',
            variation: 'single-wide',
            heading: <>Other Information</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">Visitor Information</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">For international patients</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">For international patients</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Feedback & Complaints</a>
              </TextLink>,
            ],
            cta: (
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            ),
            mobileCta: (
              <a href="#">
                <span>
                  View all <strong>Other Information</strong>
                </span>
              </a>
            ),
          },
          serviceCard,
          blogCard,
        ],
        hasChildren: true,
      },
    ],
    search: (
      <TextLink>
        <button>
          <Icons iconName={'iconSearch'} />
          <span className="sr-only">Search</span>
        </button>
      </TextLink>
    ),
  },
  decorators: [
    (Story) => (
      <header>
        <Story />
      </header>
    ),
  ],
};

export const AlanDoherty: StoryObj<typeof Navigation> = {
  args: {
    themeClosed: 'J-HCA-Tangerine-20',
    themeOpen: 'Alan-Black',
    eyebrow: {
      left: <></>,
      right: (
        <>
          <TextLink variation="body-medium">
            <a href="#">Call us 0121 4464 444</a>
          </TextLink>
        </>
      ),
    },
    tabs: [
      {
        heading: 'What we do',
        mobileTabCta: (
          <a href="#">
            <span>What we do</span>
          </a>
        ),
        content: [
          {
            template: 'Main Navigation Links List',
            variation: 'double',
            heading: <>What we do</>,
            links: [
              <TextLink variation={'body-large'}>
                <a href="#">CT Scans</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Echocardiogram</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">MRI Scan</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Ultrasound</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Bone Density scan</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Arthroscopy</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Mammogram</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Endoscopy</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">Fertility diagnostics</a>
              </TextLink>,
              <TextLink variation={'body-large'}>
                <a href="#">ERCP</a>
              </TextLink>,
            ],
          },
        ],
        hasChildren: true,
      },
      {
        heading: 'About Alan Doherty',
        content: [],
        hasChildren: false,
        tabCta: <a href="#">About Alan Doherty</a>,
      },
      {
        heading: 'Our team',
        content: [],
        hasChildren: false,
        tabCta: <a href="#">Our team</a>,
      },
    ],
    search: (
      <TextLink>
        <button>
          <Icons iconName={'iconSearch'} />
          <span className="sr-only">Search</span>
        </button>
      </TextLink>
    ),
  },
  decorators: [
    (Story) => (
      <header>
        <Story />
      </header>
    ),
  ],
};
