import React from 'react';
import { HomepageHeroProps } from './HomepageHero.types';
import styles from './HomepageHero.module.scss';
import Themes from '../../foundation/Themes/Themes';
import HomepageIntroBlock from '../../site-components/HomepageIntroBlock/HomepageIntroBlock';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Doctify from '../../components/Doctify/Doctify';
import CQCBlock from '../../components/CQCBlock/CQCBlock';

const HomepageHero = (props: HomepageHeroProps): JSX.Element => {
  const { theme, title, search, ctaTitle, ctas, image } = props;
  return (
    <>
      <Themes theme={theme}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.search}>{search}</div>
            <div className={styles['cta-section']}>
              {ctaTitle}
              <div className={styles['ctas']}>{ctas}</div>
            </div>
            <div className={styles.image}>{image}</div>
          </div>
        </div>
      </Themes>
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
    </>
  );
};

export default HomepageHero;
