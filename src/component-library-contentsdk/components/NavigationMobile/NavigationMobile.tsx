'use client';
import React, { useEffect, useState, type JSX } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './NavigationMobile.module.scss';
import Themes from '../../foundation/Themes/Themes';
import LogoBlue from '../../foundation/BrandAssets/Logo blue.svg?react';
import LogoWhite from '../../foundation/BrandAssets/Logo white.svg?react';
import Icons from '../../foundation/Icons/Icons';
import TextLink from '../../core-components/TextLink/TextLink';
import Button from '../../core-components/Button/Button';
import {
  NavigationProps,
  NavigationTab,
} from '../../site-components/Navigation/Navigation.types';

interface BackButtonProps {
  callback: () => void;
  displayText: JSX.Element;
}

const BackButton = (props: BackButtonProps) => {
  const { callback, displayText } = props;
  return (
    <div className={styles.back}>
      <TextLink variation={'body-large'}>
        <button onClick={callback}>
          <Icons iconName={'iconArrowLeft'} />
          {displayText}
        </button>
      </TextLink>
    </div>
  );
};

const NavigationMobile = (props: NavigationProps): JSX.Element => {
  const {
    eyebrow,
    tabs,
    themeOpen = 'B-HCA-Navy-Blue',
    themeClosed = 'I-HCA-Goldenrod',
    search,
    homeUrl = '/',
    logo,
    darkLogo,
  } = props;

  // Hooks
  const [isOpen, setIsOpen] = useState(false);

  const [primaryChoice, setPrimaryChoice] = useState<number | null>(null);
  const [secondaryChoice, setSecondaryChoice] = useState<number | null>(null);

  // Prevent body scroll while nav open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Event handlers
  const closeNavigation = () => {
    setIsOpen(false);
    setPrimaryChoice(null);
    setSecondaryChoice(null);
  };
  const openNavigation = () => setIsOpen(true);

  // Close the nav after App Router route changes
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    closeNavigation();
  }, [pathname, searchParams]);

  // Transform props to filter out desktop child components
  const mobileTabs: NavigationTab[] = tabs.map((tab) => ({
    ...tab,
    content: tab.content?.filter((item) => {
      const isLinkList = item.template === 'Main Navigation Links List';
      const isSimpleContentBlock =
        item.template === 'Navigation Content Block' &&
        ['simple', 'single'].includes(item.variation || '') &&
        item.showOnMobile;
      return isLinkList || isSimpleContentBlock;
    }),
  }));

  // Sub-components
  const toggleButton = (
    <TextLink>
      <button
        data-navigation-type={isOpen ? 'mobileNavigationOpen' : null}
        onClick={isOpen ? closeNavigation : openNavigation}
        aria-expanded={isOpen}
      >
        <span className={isOpen ? '' : 'sr-only'}>
          <Icons iconName={'iconCross'} />
        </span>
        <span className={isOpen ? 'sr-only' : ''}>
          <Icons iconName={'icon3Lines'} />
        </span>
        <span className={'sr-only'}>
          {isOpen ? 'Close navigation' : 'Open navigation'}
        </span>
      </button>
    </TextLink>
  );

  return (
    <Themes theme={isOpen ? themeOpen : themeClosed}>
      <div
        data-event="mobileNavigationClick"
        className={[styles.wrapper, isOpen ? styles.open : styles.closed].join(
          ' '
        )}
      >
        <nav className={[styles.navigation].join(' ')} role="navigation">
          <div className={styles.main}>
            <a className={styles.logo} href={homeUrl}>
              <span className="sr-only">Home</span>
              {isOpen ? logo || <LogoWhite /> : darkLogo || <LogoBlue />}
            </a>
            <div className={styles.ctas}>
              {search && (
                <div
                  className={styles['search-wrapper']}
                  data-navigation-type="searchOpen"
                >
                  {search}
                </div>
              )}
              {toggleButton}
            </div>
          </div>
          <div className={[styles.drawer, isOpen ? styles.open : ''].join(' ')}>
            {primaryChoice !== null && (
              <>
                {(secondaryChoice === null ||
                  mobileTabs[primaryChoice].content.length <= 1) && (
                  <BackButton
                    callback={() => {
                      setPrimaryChoice(null);
                      setSecondaryChoice(null);
                    }}
                    displayText={
                      <>
                        Back to <strong>Menu</strong>
                      </>
                    }
                  />
                )}
                {secondaryChoice !== null &&
                  mobileTabs[primaryChoice].content.length > 1 && (
                    <BackButton
                      callback={() => setSecondaryChoice(null)}
                      displayText={
                        <>
                          Back to{' '}
                          <strong>{mobileTabs[primaryChoice].heading}</strong>
                        </>
                      }
                    />
                  )}
              </>
            )}

            <div
              className={[
                styles.links,
                primaryChoice === null && secondaryChoice === null
                  ? styles.primary
                  : '',
              ].join(' ')}
            >
              <ul>
                {mobileTabs.map((primary, primaryIndex) => {
                  if (primary.hasChildren) {
                    return (
                      <React.Fragment key={primaryIndex}>
                        <li
                          className={
                            primaryChoice === null ? '' : styles.hidden
                          }
                        >
                          <TextLink full={true}>
                            <button
                              data-navigation-type="mobileNavClick"
                              onClick={() => {
                                setPrimaryChoice(primaryIndex);
                                if (primary.content.length <= 1) {
                                  setSecondaryChoice(0);
                                }
                              }}
                            >
                              <span>{primary.heading}</span>
                              <Icons iconName={'iconChevronRight'} />
                            </button>
                          </TextLink>
                        </li>
                        <li
                          className={[
                            styles.grow,
                            primaryChoice === primaryIndex ? '' : styles.hidden,
                          ].join(' ')}
                        >
                          <ul>
                            {primary.content?.map(
                              (secondary, secondaryIndex) => {
                                return (
                                  <React.Fragment key={secondaryIndex}>
                                    <li
                                      className={
                                        primaryChoice === primaryIndex &&
                                        secondaryChoice === null
                                          ? ''
                                          : styles.hidden
                                      }
                                    >
                                      <TextLink full={true}>
                                        {['simple', 'single'].includes(
                                          secondary.variation || ''
                                        ) ? (
                                          <>{secondary.mobileCta}</>
                                        ) : (
                                          <button
                                            data-navigation-type="mobileSubNavClick"
                                            onClick={() =>
                                              setSecondaryChoice(secondaryIndex)
                                            }
                                          >
                                            <span>{secondary.heading}</span>
                                            <Icons
                                              iconName={'iconChevronRight'}
                                            />
                                          </button>
                                        )}
                                      </TextLink>
                                    </li>
                                    <li
                                      className={[
                                        styles.grow,
                                        secondaryChoice === secondaryIndex
                                          ? ''
                                          : styles.hidden,
                                      ].join(' ')}
                                    >
                                      <ul>
                                        {secondary.links?.map(
                                          (tertiary, index) => (
                                            <li
                                              data-navigation-type="navigationLinkClickMobile"
                                              key={index}
                                              className={
                                                primaryChoice ===
                                                  primaryIndex &&
                                                secondaryChoice ===
                                                  secondaryIndex
                                                  ? ''
                                                  : styles.hidden
                                              }
                                            >
                                              {tertiary}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </li>
                                    <li
                                      data-navigation-type="NavigationTextCTAMobile"
                                      className={[
                                        styles.bottom,
                                        primaryChoice === primaryIndex &&
                                        secondaryChoice === secondaryIndex
                                          ? ''
                                          : styles.hidden,
                                      ].join(' ')}
                                    >
                                      <Button
                                        size={'large'}
                                        variation={'outline'}
                                      >
                                        {secondary.mobileCta}
                                      </Button>
                                    </li>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </ul>
                        </li>
                        {primary.mobileTabCta && (
                          <li
                            data-navigation-type="navigationCTAMobile"
                            className={[
                              styles.bottom,
                              primaryChoice === primaryIndex &&
                              (secondaryChoice === null ||
                                primary.content.length <= 1)
                                ? ''
                                : styles.hidden,
                            ].join(' ')}
                          >
                            <Button size={'large'} variation={'outline'}>
                              {primary.mobileTabCta}
                            </Button>
                          </li>
                        )}
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={primaryIndex}>
                        <li
                          className={
                            primaryChoice === null ? '' : styles.hidden
                          }
                        >
                          <TextLink full={true}>{primary.tabCta}</TextLink>
                        </li>
                      </React.Fragment>
                    );
                  }
                })}
              </ul>
            </div>
            {primaryChoice === null && (
              <div className={styles.eyebrow}>
                <div
                  className={styles['eyebrow-inner']}
                  data-event="mobileNavigationClick"
                  data-navigation-type="headerNavigationMobile"
                >
                  {eyebrow?.left}
                  {eyebrow?.right}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </Themes>
  );
};

export default NavigationMobile;
