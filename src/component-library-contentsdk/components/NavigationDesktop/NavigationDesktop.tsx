import React, { Suspense, type JSX } from 'react';
import styles from './NavigationDesktop.module.scss';
import Themes from '../../foundation/Themes/Themes';
import LogoBlue from '../../foundation/BrandAssets/Logo blue.svg?react';
import LogoWhite from '../../foundation/BrandAssets/Logo white.svg?react';
import TextLink from '../../core-components/TextLink/TextLink';
import CardNavigation from '../../components/CardNavigation/CardNavigation';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import {
  NavigationProps,
  TabContent,
} from '../../site-components/Navigation/Navigation.types';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Button from '../../core-components/Button/Button';
import Container from '../../foundation/Containers/Container';
import NavigationDesktopControllerClient from './NavigationDesktopControllerClient';

const TabChildComponent = (props: TabContent) => {
  const { variation, template, heading, description, date, tag, links, cta } =
    props;
  switch (template) {
    case 'Main Navigation Links List':
      switch (variation) {
        case 'single-narrow':
          return (
            <div
              data-navigation-type={'NavigationTextCTADesktop'}
              className={styles[`span-${2}`]}
            >
              <Text variation={'body-bold-extra-large'}>{heading}</Text>
              <ul data-navigation-type={'navigationLinkClick'}>
                {links?.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
              <TextButton>{cta}</TextButton>
            </div>
          );
        case 'single-wide':
          return (
            <div
              data-navigation-type={'NavigationCTADesktop'}
              className={styles[`span-${3}`]}
            >
              <Text variation={'body-bold-extra-large'}>{heading}</Text>
              <ul data-navigation-type={'navigationLinkClick'}>
                {links?.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
              <Button size={'large'} variation={'full'}>
                {cta}
              </Button>
            </div>
          );
        case 'double':
          return (
            <div
              data-navigation-type={'NavigationTextCTADesktop'}
              className={styles[`span-${6}`]}
            >
              <Text variation={'body-bold-extra-large'}>{heading}</Text>
              <ul
                data-navigation-type={'navigationLinkClick'}
                className={styles.double}
              >
                {links?.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
              <Button size={'large'} variation={'full'}>
                {cta}
              </Button>
            </div>
          );
        case 'full':
          return (
            <div
              data-navigation-type={'NavigationTextCTADesktop'}
              className={styles[`span-${12}`]}
            >
              <Text variation={'body-bold-extra-large'}>{heading}</Text>
              <ul
                className={styles.full}
                data-navigation-type={'navigationLinkClick'}
              >
                {links?.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
              <Button size={'large'} variation={'full'}>
                {cta}
              </Button>
            </div>
          );

        default:
          return <></>;
      }
    case 'Navigation Content Block':
      switch (variation) {
        case 'double':
          return (
            <>
              <div
                data-navigation-type={'NavigationCTADesktop'}
                className={styles[`span-${4}`]}
              >
                <AdvancedBlockHeader
                  paddingSize="none"
                  title={
                    <Text tag="p" variation={'display-4'}>
                      {heading}
                    </Text>
                  }
                  body={<Text variation="body-large">{description}</Text>}
                  ctas={
                    <Button size={'large'} variation={'full'}>
                      {cta}
                    </Button>
                  }
                />
              </div>
              <div className={styles[`span-${1}`]} />
            </>
          );
        case 'single':
          return (
            <div
              data-navigation-type={'NavigationCTADesktop'}
              className={styles[`span-${3}`]}
            >
              <CardNavigation
                title={
                  <Text tag="p" variation={'heading-2'}>
                    {heading}
                  </Text>
                }
                body={
                  <Text tag="p" variation="body-medium">
                    {description}
                  </Text>
                }
                cta={
                  <Button size="small" variation="full">
                    {cta}
                  </Button>
                }
              />
            </div>
          );
        case 'simple':
          return (
            <>
              <div
                data-navigation-type={'NavigationCTADesktop'}
                className={[styles[`span-${3}`], ''].join(' ')}
              >
                <Text tag="p" variation={'body-medium-extra-large'}>
                  {heading}
                </Text>
                <Container marginTop="spacing-4">
                  <Text variation="body-large">{description}</Text>
                </Container>{' '}
                <Container marginTop="spacing-6">
                  <TextButton>{cta}</TextButton>
                </Container>
              </div>
            </>
          );
      }
    case 'Navigation Blog Post Card':
      return (
        <div
          data-navigation-type={'navigationLinkClick'}
          className={styles[`span-${3}`]}
        >
          <CardNavigation
            title={
              <Text tag="p" variation={'heading-2'}>
                {heading}
              </Text>
            }
            body={
              <Text tag="p" variation="body-medium">
                {description}
              </Text>
            }
            tag={<span>{tag}</span>}
            date={date}
          />
        </div>
      );
    case 'Spacer':
      return <div className={styles[`span-${1}`]} />;
  }
};

const NavigationDesktop = (props: NavigationProps): JSX.Element => {
  const {
    eyebrow,
    tabs,
    themeOpen = 'B-HCA-Navy-Blue',
    themeClosed = 'I-HCA-Goldenrod',
    defaultTab = null,
    search,
    homeUrl = '/',
    logo,
    darkLogo,
  } = props;

  const isOpen = defaultTab !== null;

  return (
    <Themes theme={isOpen ? themeOpen : themeClosed}>
      <div
        data-event="navigationClick"
        data-navigation-desktop-root
        className={[styles.wrapper, isOpen ? styles.open : styles.closed].join(
          ' '
        )}
      >
        <Suspense fallback={null}>
          <NavigationDesktopControllerClient
            initialActiveIndex={defaultTab}
            themeClosed={themeClosed}
            themeOpen={themeOpen}
          />
        </Suspense>
        <div className={[styles.navigation].join(' ')}>
          {eyebrow && (
            <div
              className={styles.eyebrow}
              data-navigation-type="headerNavigation"
            >
              <div className={styles['eyebrow-inner']}>
                {eyebrow.left && (
                  <div className={styles['eyebrow-left']}>{eyebrow.left}</div>
                )}
                {eyebrow.right && (
                  <div className={styles['eyebrow-right']}>{eyebrow.right}</div>
                )}
              </div>
            </div>
          )}
          <div className={styles.main}>
            <div>
              <a
                className={styles.logo}
                href={homeUrl}
                data-navigation-type="logoNavigation"
              >
                <span className="sr-only">Home</span>
                <span className={styles['logo-closed']}>
                  {darkLogo || <LogoBlue />}
                </span>
                <span className={styles['logo-open']}>
                  {logo || <LogoWhite />}
                </span>
              </a>
            </div>
            <ul className={styles.tabs}>
              {tabs.map((tab, tabIndex) => {
                if (tab.hasChildren) {
                  const isActive = defaultTab === tabIndex;

                  return (
                    <React.Fragment key={tabIndex}>
                      <li
                        data-navigation-desktop-control
                        data-navigation-desktop-tab-index={tabIndex}
                        className={[
                          styles.control,
                          isActive ? styles.active : '',
                        ].join(' ')}
                      >
                        <TextLink variation="body-medium">
                          <button
                            aria-expanded={isActive}
                            aria-controls={`#navigation-tab-${tabIndex}`}
                            type="button"
                          >
                            {tab.heading}
                          </button>
                        </TextLink>
                      </li>
                      <li
                        data-navigation-desktop-drawer
                        data-navigation-desktop-tab-index={tabIndex}
                        className={[
                          styles.drawer,
                          isActive ? styles.active : '',
                        ].join(' ')}
                      >
                        <div
                          id={`navigation-tab-${tabIndex}`}
                          className={[styles.content].join(' ')}
                        >
                          {tab?.content?.map((item, index) => (
                            <TabChildComponent key={index} {...item} />
                          ))}
                        </div>
                      </li>
                    </React.Fragment>
                  );
                }

                return (
                  <li
                    key={tabIndex}
                    className={styles.control}
                    data-navigation-type="navigationLinkClick"
                  >
                    <TextLink variation="body-medium">{tab.tabCta}</TextLink>
                  </li>
                );
              })}
              {search && (
                <li
                  className={styles.control}
                  data-navigation-type="searchOpen"
                >
                  {search}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default NavigationDesktop;
