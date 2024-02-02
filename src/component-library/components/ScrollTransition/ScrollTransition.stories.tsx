import React from 'react';
import ScrollTransition from './ScrollTransition';
import type { Meta, StoryObj } from '@storybook/react';

import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import HomepageIntroBlock from '../../site-components/HomepageIntroBlock/HomepageIntroBlock';
import Doctify from '../../components/Doctify/Doctify';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Icons from '../../foundation/Icons/Icons';
import Tags from '../../core-components/Tags/Tags';
import Themes from '../../foundation/Themes/Themes';
import ServiceCards from '../../site-components/ServiceCards/ServiceCards';
import CardService from '../CardService/CardService';
import CarouselCards from '../../site-components/CarouselCards/CarouselCards';
import CardBlog from '../CardBlog/CardBlog';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ScrollTransition> = {
  title: 'POC/ScrollTransition',
  component: ScrollTransition,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ScrollTransition> = {
  args: {
    children: (
      <>
        <HomepageIntroBlock
          title={
            <Text variation="display-1" tag="h2">
              Committed to your care
            </Text>
          }
          copy={
            <Text variation="body-large" tag="p">
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
              dolore.
            </Text>
          }
          stats={[
            {
              value: <span>26</span>,
              label: <span>years in the UK</span>,
            },
            {
              value: <span>3,000</span>,
              label: <span>consultants</span>,
            },
            {
              value: <span>770</span>,
              label: <span>inpatient beds</span>,
            },
          ]}
          cta={
            <a href="#">
              About <strong>HCA Healthcare UK</strong>
            </a>
          }
          image={
            <Image
              src="/placeholders/happy-nurse.jpeg"
              alt=""
              width="1875"
              height="1500"
            />
          }
          cqc={
            <Themes theme="F-HCA-White">
              <CQCBlock
                link={<a href="#"></a>}
                title="Care Quality Commission verified"
                text="All our hospitals are rated Good or Oustanding."
                icon={<Icons iconName="iconCheckCircle"></Icons>}
                logo={{
                  dark: (
                    <Image
                      src="/cqc-white.png"
                      alt="cqc logo"
                      width="120"
                      height="37"
                    />
                  ),
                  light: (
                    <Image
                      src="/cqc-color.png"
                      alt="cqc logo"
                      width="120"
                      height="37"
                    />
                  ),
                }}
              />
            </Themes>
          }
          doctify={
            <Themes theme="E-HCA-Dark-Grey">
              <Doctify
                alignment="left"
                link={<a href="#"></a>}
                rating={5}
                reviews="13,500 +"
                logo={{
                  dark: (
                    <Image
                      src="/doctify-dark.png"
                      alt="doctify logo"
                      width="83"
                      height="21"
                    />
                  ),
                  light: (
                    <Image
                      src="/doctify-light.png"
                      alt="doctify logo"
                      width="83"
                      height="21"
                    />
                  ),
                }}
              />
            </Themes>
          }
        />
        <ServiceCards
          title={
            <Text variation="display-2">Exceptional care you can trust</Text>
          }
          subtitle={<Text variation="subheading-1">our service lines</Text>}
          bodyText={
            <Text>
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
              dolore.
            </Text>
          }
          cta={
            <a href="#">
              <Icons iconName="iconSearch"></Icons> Search all service lines
            </a>
          }
        >
          <CardService link={<a href="#">Learn More</a>}>
            <Image
              src="/placeholders/children-playing.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <Text variation="display-6">Cardiac Care 1</Text>
          </CardService>
          <CardService link={<a href="#">Learn More</a>}>
            <Image
              src="/placeholders/children-playing.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <Text variation="display-6">Cardiac Care 2</Text>
          </CardService>
          <CardService link={<a href="#">Learn More</a>}>
            <Image
              src="/placeholders/children-playing.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <Text variation="display-6">Cardiac Care 3</Text>
          </CardService>
          <CardService link={<a href="#">Learn More</a>}>
            <Image
              src="/placeholders/children-playing.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <Text variation="display-6">Cardiac Care 4</Text>
          </CardService>
          <CardService link={<a href="#">Learn More</a>}>
            <Image
              src="/placeholders/children-playing.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
            <Text variation="display-6">Cardiac Care 5</Text>
          </CardService>
        </ServiceCards>

        {/* <CarouselCards
          title={<span>Orthopaedics Patient Stories</span>}
          link={
            <a href="#">
              <Icons iconName="iconSearch" />
              <span>
                View all <strong>patient stories</strong>
              </span>
            </a>
          }
          theme="F-HCA-White"
          children={[
            <CardBlog key={0}>
              <>
                <Image
                  src="/placeholders/children-playing.jpg"
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
                  sharing theirs There are over 1400 at The Portland, each year.
                  Hear new mums sharing theirs
                </Text>
                <Tags>
                  <a href="#">Announcement</a>
                </Tags>
              </>
            </CardBlog>,
            <CardBlog key={1}>
              <>
                <Image
                  src="/placeholders/children-playing.jpg"
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
            </CardBlog>,
            <CardBlog key={2}>
              <>
                <Image
                  src="/placeholders/children-playing.jpg"
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
            </CardBlog>,
            <CardBlog key={3}>
              <>
                <Image
                  src="/placeholders/children-playing.jpg"
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
            </CardBlog>,
          ]}
        ></CarouselCards> */}
      </>
    ),
  },
};
