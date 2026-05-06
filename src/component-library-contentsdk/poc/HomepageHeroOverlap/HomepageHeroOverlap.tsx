import React, { type JSX } from 'react';
import { HomepageHeroOverlapProps } from './HomepageHeroOverlap.types';
import HeaderWithImage from '../../site-components/HeaderWithImage/HeaderWithImage';
import HomepageIntroBlock from '../../site-components/HomepageIntroBlock/HomepageIntroBlock';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Doctify from '../../components/Doctify/Doctify';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import styles from './HomepageHeroOverlap.module.scss';

const HomepageHeroOverlap = (props: HomepageHeroOverlapProps): JSX.Element => {
  const {} = props;
  return (
    <div className={styles.wrapper}>
      <HeaderWithImage
        title={
          <Text variation={'display-1'} tag="h2">
            Departments
          </Text>
        }
        copy={
          <Text variation={'body-large'} tag="p">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore.
          </Text>
        }
        ctas={
          <>
            <Button size={'large'} variation={'full'}>
              <a href="#">
                <Icons iconName={'iconStethoscope'} />
                <span>
                  Find a <strong>Consultant</strong>
                </span>
              </a>
            </Button>
            <Button size={'large'} variation={'outline'}>
              <a href="#">
                <Icons iconName={'iconPhone'} />
                <span>
                  Call us <strong>today</strong>
                </span>
              </a>
            </Button>
          </>
        }
        image={
          <Image
            src="/placeholders/lab-technician.jpeg"
            alt="lab technician"
            width="1024"
            height="683"
          />
        }
        theme={'F-HCA-Fern'}
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
          // ...
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
          <CQCBlock
            theme="light"
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
        }
        doctify={
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
        }
      />
    </div>
  );
};

export default HomepageHeroOverlap;
