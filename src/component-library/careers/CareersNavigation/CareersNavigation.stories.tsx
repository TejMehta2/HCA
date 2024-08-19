/* eslint-disable react/jsx-key */
import React from 'react';
import Navigation from '../../site-components/Navigation/Navigation';
import { Default as NavigationDefault } from '../../site-components/Navigation/Navigation.stories';

import type { Meta, StoryObj } from '@storybook/react';
import TextLink from '../../core-components/TextLink/TextLink';
import Text from '../../foundation/Text/Text';
import { NavigationProps } from '../../site-components/Navigation/Navigation.types';
import Icons from '../../foundation/Icons/Icons';

const args: NavigationProps = {
  ...NavigationDefault.args,
  eyebrow: {
    left: (
      <>
        <TextLink variation="body-medium">
          <a href="#">Events</a>
        </TextLink>
        <TextLink variation="body-medium">
          <a href="#">Locations</a>
        </TextLink>
        <TextLink variation="body-medium">
          <a href="#">Relocating to the UK</a>
        </TextLink>
      </>
    ),
    right: (
      <>
        <TextLink variation="body-medium">
          <a href="#">
            <span>Go to HCA Healthcare UK website </span>
            <Icons iconName={'iconExternal'} />
          </a>
        </TextLink>
      </>
    ),
  },
  tabs: [
    {
      heading: 'Working at HCA',
      mobileTabCta: (
        <a href="#">
          <span>
            View all <strong>Working at HCA</strong>
          </span>
        </a>
      ),
      content: [
        {
          template: 'Navigation Content Block',
          variation: 'double',
          heading: <>Working at HCA</>,
          description: (
            <Text variation="body-large" tag="span">
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum et culpa minim.
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
                View all <strong>Working at HCA</strong>
              </span>
            </a>
          ),
        },
        {
          template: 'Spacer',
        },
        {
          template: 'Main Navigation Links List',
          variation: 'simple',
          heading: <>Diversity</>,
          description: (
            <Text variation="body-large">
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum et culpa minim.
            </Text>
          ),
          cta: (
            <a href="#">
              <span>
                Learn <strong>more</strong>
              </span>
            </a>
          ),
          mobileCta: (
            <a href="#">
              <span>Diversity</span>
            </a>
          ),
        },
        {
          template: 'Main Navigation Links List',
          variation: 'simple',
          heading: <>Life at HCA</>,
          description: (
            <Text variation="body-large">
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum et culpa minim.
            </Text>
          ),
          cta: (
            <a href="#">
              <span>
                Learn <strong>more</strong>
              </span>
            </a>
          ),
          mobileCta: (
            <a href="#">
              <span>Life at HCA</span>
            </a>
          ),
        },
      ],
      hasChildren: true,
    },
    {
      heading: 'Our roles',
      content: [
        {
          template: 'Main Navigation Links List',
          variation: 'full',
          heading: <>Our roles</>,
          links: [
            <TextLink variation={'body-medium'}>
              <a href="#">Nursing & Front Line Clinical Services</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Theatres</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Midwives and Front Line Clinical Services</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Doctors – Hospitals and Outpatients</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">GP Services and Primary Care Medical</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Pharmacy and Allied Healthcare Professionals</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Laboratories and Scientists</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Laboratories and Scientists</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Information Technology Group</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Patient Support Services</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Hotel Services</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">EHR Transformation</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">The Harborne Hospital</a>
            </TextLink>,
            <TextLink variation={'body-medium'}>
              <a href="#">Search & Apply</a>
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
                View all <strong>roles</strong>
              </span>
            </a>
          ),
        },
      ],
      mobileTabCta: (
        <a href="#">
          <span>
            View all <strong>roles</strong>
          </span>
        </a>
      ),
      hasChildren: true,
    },
    {
      heading: 'Flexible working',
      hasChildren: false,
      content: [],
      tabCta: <a href="#">Flexible working</a>,
    },
    {
      heading: 'Bank',
      hasChildren: false,
      content: [],
      tabCta: <a href="#">Bank</a>,
    },
    {
      heading: 'Float',
      hasChildren: false,
      content: [],
      tabCta: <a href="#">Float</a>,
    },
  ],
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Navigation> = {
  title: 'Careers/CareersNavigation',
  component: Navigation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Navigation> = {
  args,
};
