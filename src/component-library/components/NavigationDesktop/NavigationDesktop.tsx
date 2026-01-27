import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './NavigationDesktop.module.scss';
import Themes from '../../foundation/Themes/Themes';
import LogoBlue from '../../foundation/BrandAssets/Logo blue.svg';
import LogoWhite from '../../foundation/BrandAssets/Logo white.svg';
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
import Icons from '../../foundation/Icons/Icons';
import Modals from '../Modals/Modals';

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
    darkLogo
  } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [location, setLocation] = useState('London');

  // close the nav when clicking a link within
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', closeNavigation);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', closeNavigation);
    };
  }, [router]);

  // State
  const [currentTab, setCurrentTab] = useState(defaultTab);

  // Event handlers
  const tabHandler = (index: number | null) => () => setCurrentTab(index);
  const closeNavigation = () => setCurrentTab(null);

  const isOpen = currentTab !== null;

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
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
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
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
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
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
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
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
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

  return (
    <Themes theme={isOpen ? themeOpen : themeClosed}>
      <div
        data-event="navigationClick"
        className={[styles.wrapper, isOpen ? styles.open : styles.closed].join(
          ' '
        )}
        onMouseLeave={closeNavigation}
      >
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
                {isOpen ? logo || <LogoWhite /> : darkLogo || <LogoBlue />}
              </a>
              <TextButton theme="dark">
                <button
                  onClick={() =>
                    dialogRef?.current?.show()
                  }
                >
                  <Icons iconName="iconPin" />
                  {location}
                </button>
              </TextButton>
              <Modals ref={dialogRef} alignContent='center'>
                <a href="javascript:OneTrust.ToggleInfoDisplay()">Save this location withCookie settings</a>
                {location !== 'London' &&
                  <Container marginRight="spacing-4" marginLeft="spacing-4">
                    <Button
                      size={'small'}
                      variation={'full-dark'}
                      contentVariation="full-width"
                    >
                      <button
                        onClick={() => {
                          dialogRef?.current?.close();
                          // document.cookie = `location=${encodeURIComponent('London')}; path=/; max-age=31536000; SameSite=Lax`;
                          setLocation('London');
                        }
                        }
                      >
                        <span>{'London'}</span>
                      </button>
                    </Button>
                  </Container>
                }
                {
                  location !== "Manchester" &&
                  <Container marginRight="spacing-4" marginLeft="spacing-4">
                    <Button
                      size={'small'}
                      variation={'full-dark'}
                      contentVariation="full-width"
                    >
                      <button
                        onClick={() => {
                          dialogRef?.current?.close();
                          // document.cookie = `location=${encodeURIComponent('Manchester')}; path=/; max-age=31536000; SameSite=Lax`;
                          setLocation('Manchester');
                        }
                        }
                      >
                        <span>{'Manchester'}</span>
                      </button>
                    </Button>
                  </Container>
                }
                {
                  location !== 'Birmingham' &&
                  <Container marginRight="spacing-4" marginLeft="spacing-4">
                    <Button
                      size={'small'}
                      variation={'full-dark'}
                      contentVariation="full-width"
                    >
                      <button
                        onClick={() => {
                          dialogRef?.current?.close();
                          // document.cookie = `location=${encodeURIComponent('Birmingham')}; path=/; max-age=31536000; SameSite=Lax`;
                          setLocation('Birmingham')
                        }
                        }
                      >
                        <span>{'Birmingham'}</span>
                      </button>
                    </Button>
                  </Container>
                }
              </Modals>

            </div>
            <ul className={styles.tabs}>
              {tabs.map((tab, tabIndex) => {
                if (tab.hasChildren)
                  return (
                    <React.Fragment key={tabIndex}>
                      <li
                        onMouseEnter={tabHandler(tabIndex)}
                        className={[
                          styles.control,
                          currentTab === tabIndex ? styles.active : '',
                        ].join(' ')}
                      >
                        <TextLink variation="body-medium">
                          <button
                            aria-expanded={currentTab === tabIndex}
                            aria-controls={`#navigation-tab-${tabIndex}`}
                            onClick={tabHandler(
                              currentTab === tabIndex ? null : tabIndex
                            )}
                          >
                            {tab.heading}
                          </button>
                        </TextLink>
                      </li>
                      <li
                        className={[
                          styles.drawer,
                          currentTab === tabIndex ? styles.active : '',
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
    </Themes >
  );
};

export default NavigationDesktop;
