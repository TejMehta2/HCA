import React, { useState } from 'react';
import { NavigationDesktopProps } from './NavigationDesktop.types';
import styles from './NavigationDesktop.module.scss';
import Themes from '../../foundation/Themes/Themes';
import LogoBlue from '../../foundation/BrandAssets/Logo blue.svg';
import LogoWhite from '../../foundation/BrandAssets/Logo white.svg';
import TextLink from '../../core-components/TextLink/TextLink';

import CardNavigation from '../../components/CardNavigation/CardNavigation';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import { TabContent } from '../../site-components/Navigation/Navigation.types';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Button from '../../core-components/Button/Button';

const NavigationDesktop = (props: NavigationDesktopProps): JSX.Element => {
  const {
    eyebrow,
    tabs,
    themeOpen = 'E-HCA-Dark-Grey',
    themeClosed = 'C-HCA-Beige',
    defaultTab = null,
    search,
  } = props;

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
              <div className={styles[`span-${2}`]}>
                <Text variation={'body-bold-extra-large'}>{heading}</Text>
                <ul>
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
                </ul>
                <TextButton>{cta}</TextButton>
              </div>
            );
          case 'single-wide':
            return (
              <div className={styles[`span-${3}`]}>
                <Text variation={'body-bold-extra-large'}>{heading}</Text>
                <ul>
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
                </ul>
                <Button size={'large'} theme={'full'}>
                  {cta}
                </Button>
              </div>
            );
          case 'double':
            return (
              <div className={styles[`span-${6}`]}>
                <Text variation={'body-bold-extra-large'}>{heading}</Text>
                <ul className={styles.double}>
                  {links?.map((link, index) => <li key={index}>{link}</li>)}
                </ul>
                <Button size={'large'} theme={'full'}>
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
                <div className={styles[`span-${4}`]}>
                  <AdvancedBlockHeader
                    paddingSize="none"
                    title={
                      <Text tag="h3" variation={'display-4'}>
                        {heading}
                      </Text>
                    }
                    body={<Text variation="body-large">{description}</Text>}
                    ctas={
                      <Button size={'large'} theme={'full'}>
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
              <div className={styles[`span-${3}`]}>
                <CardNavigation
                  title={
                    <Text tag="h3" variation={'heading-2'}>
                      {heading}
                    </Text>
                  }
                  body={
                    <Text tag="p" variation="body-medium">
                      {description}
                    </Text>
                  }
                  cta={
                    <Button size="small" theme="full">
                      {cta}
                    </Button>
                  }
                />
              </div>
            );
        }
      case 'Navigation Blog Post Card':
        return (
          <div className={styles[`span-${3}`]}>
            <CardNavigation
              title={
                <Text tag="h3" variation={'heading-2'}>
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
    }
  };

  return (
    <Themes theme={isOpen ? themeOpen : themeClosed}>
      <div
        className={[styles.wrapper, isOpen ? styles.open : styles.closed].join(
          ' '
        )}
        onMouseLeave={closeNavigation}
      >
        <div className={[styles.navigation].join(' ')}>
          {eyebrow && (
            <div className={styles.eyebrow}>
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
            <a className={styles.logo} href="/">
              <span className="sr-only">Home</span>
              {isOpen ? <LogoWhite /> : <LogoBlue />}
            </a>
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
                  <li key={tabIndex} className={styles.control}>
                    <TextLink variation="body-medium">{tab.tabCta}</TextLink>
                  </li>
                );
              })}
              <li className={styles.control}>{search}</li>
            </ul>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default NavigationDesktop;
