import React, { useState } from 'react';
import { NavigationDesktopProps } from './NavigationDesktop.types';
import styles from './NavigationDesktop.module.scss';
import Themes from '../../foundation/Themes/Themes';
import LogoBlue from '../../foundation/BrandAssets/Logo blue.svg';
import LogoWhite from '../../foundation/BrandAssets/Logo white.svg';
import TextLink from '../../core-components/TextLink/TextLink';
import { useScrollDirection } from '../../hooks/useScrollDirection';
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

  // Hooks
  const scrollDirection = useScrollDirection();

  // State
  const [currentTab, setCurrentTab] = useState(defaultTab);

  // Event handlers
  const tabHandler = (index: number | null) => () => setCurrentTab(index);
  const closeNavigation = () => setCurrentTab(null);

  const isOpen = () => currentTab !== null;

  const tabContentSwitch = (content: TabContent) => {
    const { variation, heading, description, date, tag, links, cta } = content;
    switch (variation) {
      case 'single-narrow':
        return (
          <div className={styles[`span-${2}`]}>
            <Text variation={'body-bold-extra-large'}>{heading}</Text>
            <ul>{links?.map((link, index) => <li key={index}>{link}</li>)}</ul>
            <TextButton>{cta}</TextButton>
          </div>
        );
      case 'single-wide':
        return (
          <div className={styles[`span-${3}`]}>
            <Text variation={'body-bold-extra-large'}>{heading}</Text>
            <ul>{links?.map((link, index) => <li key={index}>{link}</li>)}</ul>
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
      case 'header':
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
                body={description}
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
      case 'card':
        return (
          <div className={styles[`span-${3}`]}>
            <CardNavigation
              title={
                <Text tag="h3" variation={'heading-2'}>
                  {heading}
                </Text>
              }
              body={description}
              cta={
                <Button size="small" theme="full">
                  cta
                </Button>
              }
              tag={tag}
              date={date}
            />
          </div>
        );
      default:
        return <p>Unsupported navigation component: {content.variation}</p>;
    }
  };

  return (
    <div
      className={[
        styles.sticky,
        styles[scrollDirection],
        styles[isOpen() ? 'open' : ''],
      ].join(' ')}
    >
      <Themes theme={isOpen() ? themeOpen : themeClosed}>
        <div
          className={[styles.wrapper, isOpen() ? '' : styles.closed].join(' ')}
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
                    <div className={styles['eyebrow-right']}>
                      {eyebrow.right}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={styles.main}>
              <a className={styles.logo} href="/">
                <span className="sr-only">Home</span>
                {isOpen() ? <LogoWhite /> : <LogoBlue />}
              </a>
              <ul className={styles.tabs}>
                {tabs.map((tab, index) => (
                  <li
                    key={index}
                    onMouseEnter={tabHandler(index)}
                    className={[
                      styles.control,
                      currentTab === index ? styles.active : '',
                    ].join(' ')}
                  >
                    <TextLink variation="body-medium">
                      <label onFocus={tabHandler(index)}>
                        <input
                          className="sr-only"
                          type="radio"
                          name="tab"
                          checked={currentTab === index}
                          onChange={tabHandler(index)}
                        />
                        {tab.heading}
                      </label>
                    </TextLink>
                  </li>
                ))}
                <li className="sr-only">
                  <label onFocus={tabHandler(null)}>
                    <input
                      type="radio"
                      name="tab"
                      checked={currentTab === null}
                      onChange={tabHandler(null)}
                    />
                    None
                  </label>
                </li>
                <li className={styles.control}>{search}</li>
              </ul>
            </div>
            <div
              className={[styles.drawer, isOpen() ? styles.active : ''].join(
                ' '
              )}
            >
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={[
                    styles.content,
                    currentTab === index ? styles.active : '',
                  ].join(' ')}
                >
                  {tab?.content?.map(tabContentSwitch)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Themes>
    </div>
  );
};

export default NavigationDesktop;
