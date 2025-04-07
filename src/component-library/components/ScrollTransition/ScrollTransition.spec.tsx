import React from 'react';
import { render } from '@testing-library/react';
import ScrollTransition from './ScrollTransition';
import { ScrollTransitionProps } from './ScrollTransition.types';

import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import HomepageIntroBlock from '../../site-components/HomepageIntroBlock/HomepageIntroBlock';
import Doctify from '../Doctify/Doctify';
import CQCBlock from '../CQCBlock/CQCBlock';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';
import ServiceCards from '../../site-components/ServiceCards/ServiceCards';
import CardService from '../CardService/CardService';

import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

const mockProps: ScrollTransitionProps = {
  initialTheme: 'A-HCA-White',
  children: (
    <>
      <HomepageIntroBlock
        theme="A-HCA-White"
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
        subtitle={<Text variation="subheading-1">our departments</Text>}
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
            <Icons iconName="iconSearch"></Icons> Search all departments
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
    </>
  ),
};

describe('ScrollTransition', () => {
  it('Renders children from props', async () => {
    mockAllIsIntersecting(true);
    const { getByText } = render(<ScrollTransition {...mockProps} />);
    expect(getByText('Committed to your care')).toBeVisible();
  });
});
