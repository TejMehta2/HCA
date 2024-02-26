import React from 'react';
import ScrollTransition from './ScrollTransition';
import type { Meta, StoryObj } from '@storybook/react';

import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import HomepageIntroBlock from '../../site-components/HomepageIntroBlock/HomepageIntroBlock';
import Doctify from '../Doctify/Doctify';
import CQCBlock from '../CQCBlock/CQCBlock';
import Icons from '../../foundation/Icons/Icons';
import Tags from '../../core-components/Tags/Tags';
import Themes from '../../foundation/Themes/Themes';
import ServiceCards from '../../site-components/ServiceCards/ServiceCards';
import CardService from '../CardService/CardService';
import CarouselCards from '../../site-components/CarouselCards/CarouselCards';
import CardBlog from '../CardBlog/CardBlog';
import ImageAndTextBlock from '../../site-components/ImageAndTextBlock/ImageAndTextBlock';
import Button from '../../core-components/Button/Button';
import OurLocations from '../../site-components/OurLocations/OurLocations';
import { OurLocationsRegionProps } from '../OurLocationsRegion/OurLocationsRegion.types';
import MapEngland from '../../assets/locations/map-england.png';
import LondonDesktopArea from '../../assets/locations/London.png';
import LondonMobileArea from '../../assets/locations/LondonMobile.png';
import ManchesterDesktopArea from '../../assets/locations/Manchester.png';
import ManchesterMobileArea from '../../assets/locations/ManchesterMobile.png';
import BirminghamDesktopArea from '../../assets/locations/Birmingham.png';
import BirminghamMobileArea from '../../assets/locations/BirminghamMobile.png';
import HomepageHero from '../../site-components/HomepageHero/HomepageHero';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../../site-components/Footer/Footer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ScrollTransition> = {
  title: 'components/ScrollTransition',
  component: ScrollTransition,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const locations: OurLocationsRegionProps[] = [
  {
    id: 0,
    name: 'Locations across the UK',
    amount: '35',
    theme: 'B-HCA-Navy-Blue',
    area: { mobile: MapEngland },
    mapStyles: { transform: 'translateY(0) scale(1.1)' },
    cardStyles: { transform: 'translateY(-50%)' },
  },
  {
    id: 1,
    name: 'Locations across London',
    amount: '9',
    theme: 'H-HCA-Tangerine',
    area: { mobile: LondonMobileArea, desktop: LondonDesktopArea },
    mapStyles: { transform: 'translateY(-20%) scale(1.5)' },
    cardStyles: { transform: 'translateY(-55%) translateX(60%)' },
  },
  {
    id: 2,
    name: 'Locations across Manchester',
    amount: '2',
    theme: 'G-HCA-Orange',
    area: { mobile: ManchesterMobileArea, desktop: ManchesterDesktopArea },
    mapStyles: { transform: 'translateY(10%) translateX(15%) scale(1.7)' },
    cardStyles: { transform: 'translateY(-55%) translateX(15%)' },
  },
  {
    id: 3,
    name: 'Location across Birmingham',
    amount: '1',
    theme: 'F-HCA-Fern',
    area: { mobile: BirminghamMobileArea, desktop: BirminghamDesktopArea },
    mapStyles: { transform: 'translateY(-5%) translateX(25%) scale(1.7)' },
    cardStyles: { transform: 'translateY(-35%) translateX(50%)' },
  },
];

export const Default: StoryObj<typeof ScrollTransition> = {
  args: {
    initialTheme: 'H-HCA-Tangerine',
    children: (
      <>
        <HomepageHero
          theme="H-HCA-Tangerine"
          title={
            <Text tag="h1" variation="display-1">
              Extraordinary Healthcare
            </Text>
          }
          search={<SearchBar placeholder="How can we help you?" />}
          ctaTitle={
            <Text tag="h2" variation="subheading-1">
              Get Started
            </Text>
          }
          ctas={
            <>
              <Button size="large" variation="full">
                <a href="#">
                  <span>
                    Book an <strong>appointment</strong>
                  </span>
                </a>
              </Button>
              <Button size="large" variation="outline">
                <a href="#">
                  <Icons iconName="iconPhone" />
                  <span>
                    Call us <strong>today</strong>
                  </span>
                </a>
              </Button>
            </>
          }
          image={
            <Image
              src="/placeholders/couple-on-bench.jpeg"
              alt="an old couple sitting on a bench having a nice time"
              width={1460}
              height={1460}
            />
          }
        />
        <HomepageIntroBlock
          imageAlignment="left"
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
            <Themes theme="A-HCA-White">
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
            <Themes theme="B-HCA-Navy-Blue">
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

        <CarouselCards
          title={
            <Text tag="h3" variation="display-2">
              Orthopaedics Patient Stories
            </Text>
          }
          link={
            <a href="#">
              <Icons iconName="iconSearch" />
              <span>
                View all <strong>patient stories</strong>
              </span>
            </a>
          }
          theme="A-HCA-White"
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
        ></CarouselCards>
        <ImageAndTextBlock
          theme="F-HCA-Fern"
          imageAlignment="left"
          length="short"
          header={
            <Text tag="h2" variation="display-2">
              New to private healthcare?
            </Text>
          }
          image={
            <Image
              src="/placeholders/children-playing.jpg"
              alt="two children playing"
              width="643"
              height="605"
            />
          }
          ctas={
            <>
              <Button size="large" variation="full">
                <a href="#">
                  <span>
                    Learn more about <strong>self-pay</strong>
                  </span>
                </a>
              </Button>
              <Button size="large" variation="outline">
                <a href="#">
                  <span>
                    Access care with <strong>insurance</strong>
                  </span>
                </a>
              </Button>
            </>
          }
        >
          <Text tag="p" variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        </ImageAndTextBlock>

        <OurLocations
          subtitle={
            <Text tag="h3" variation="subheading-1">
              our locations
            </Text>
          }
          title={
            <Text tag="h2" variation="display-2">
              The widest range of locations in the UK
            </Text>
          }
          body={
            <Text tag="p" variation="body-large">
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum.
            </Text>
          }
          cta={
            <Button size="large" variation="full">
              <a href="#">
                <span>
                  <Icons iconName={'iconSearch'} />
                </span>
                <span>
                  Search all <strong>locations</strong>
                </span>
              </a>
            </Button>
          }
          locations={locations}
        />
      </>
    ),
  },
};

export const WithFooter: StoryObj<typeof ScrollTransition> = {
  args: {
    transitionBackground: false,
    children: (
      <Footer
        buttons={
          <>
            <Button size={'small'} variation={'outline'}>
              <a href="#">
                <Icons iconName="iconMobile" />
                <span>
                  App <strong>download</strong>
                </span>
              </a>
            </Button>
            <Button size={'small'} variation={'outline'}>
              <a href="#">
                <Icons iconName="iconRedo" />
                <span>
                  Get a <strong>second opinion</strong>
                </span>
              </a>
            </Button>
            <Button size={'small'} variation={'outline'}>
              <a href="#">
                <Icons iconName="iconStethoscope" />
                <span>
                  Find a <strong>doctor</strong>
                </span>
              </a>
            </Button>
            <Button size={'small'} variation={'outline'}>
              <a href="#">
                <Icons iconName="iconCreditCard" />
                <span>
                  Pay my <strong>bill</strong>
                </span>
              </a>
            </Button>
          </>
        }
        columns={[
          {
            title: 'About HCA',
            links: [
              <a key={0} href="#">
                Our HCA Story
              </a>,
              <a key={1} href="#">
                Our Quality Commitment
              </a>,
              <a key={2} href="#">
                Our Mission Statement
              </a>,
              <a key={3} href="#">
                Contact HCA UK
              </a>,
            ],
            socials: [
              <Button key={0} size={'small'} variation={'social'}>
                <a href="#">
                  <Icons iconName="iconFacebook" />
                  <span className="sr-only">Facebook link</span>
                </a>
              </Button>,
              <Button key={1} size={'small'} variation={'social'}>
                <a href="#">
                  <Icons iconName="iconInstagram" />
                  <span className="sr-only">Instagram link</span>
                </a>
              </Button>,
              <Button key={2} size={'small'} variation={'social'}>
                <a href="#">
                  <Icons iconName="iconLinkedin" />
                  <span className="sr-only">Linkedin link</span>
                </a>
              </Button>,
            ],
          },
          {
            title: 'Service lines',
            links: [
              <a key={0} href="#">
                Cancer Care
              </a>,
              <a key={1} href="#">
                Cardiac Care
              </a>,
              <a key={2} href="#">
                Neurology
              </a>,
              <a key={3} href="#">
                Women’s Health
              </a>,
              <a key={4} href="#">
                Orthopaedic Care
              </a>,
            ],
          },
          {
            title: 'Media',
            links: [
              <a key={0} href="#">
                Blog
              </a>,
              <a key={1} href="#">
                News & Press Releases
              </a>,
              <a key={2} href="#">
                Patient Stories
              </a>,
              <a key={3} href="#">
                Careers
              </a>,
            ],
          },
          {
            reviews: [
              <CQCBlock
                key={0}
                link={<a href="#">CQCBlock</a>}
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
              />,
              <Doctify
                key={1}
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
              />,
            ],
          },
        ]}
        legals={[
          <a key={0} href="#">
            Privacy Policy
          </a>,
          <a key={1} href="#">
            Modern Slavery
          </a>,
          <a key={2} href="#">
            Gender Pay Gap
          </a>,
          <a key={3} href="#">
            Cookie Settings
          </a>,
        ]}
      />
    ),
  },
};
