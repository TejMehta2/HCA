import React, { Suspense, type JSX } from 'react';
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
import NavigationMobileControllerClient from './NavigationMobileControllerClient';

const BackButton = ({
  children,
  type,
}: {
  children: JSX.Element;
  type: 'menu' | 'secondary';
}) => (
  <div
    className={[styles.back, styles.hidden].join(' ')}
    data-navigation-mobile-back={type}
  >
    <TextLink variation={'body-large'}>
      <button type="button" data-navigation-mobile-back-button={type}>
        <Icons iconName={'iconArrowLeft'} />
        {children}
      </button>
    </TextLink>
  </div>
);

const getMobileTabs = (tabs: NavigationTab[]): NavigationTab[] =>
  tabs.map((tab) => ({
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
  const mobileTabs = getMobileTabs(tabs);

  return (
    <Themes theme={themeClosed}>
      <div
        data-event="mobileNavigationClick"
        data-navigation-mobile-root
        className={[styles.wrapper, styles.closed].join(' ')}
      >
        <Suspense fallback={null}>
          <NavigationMobileControllerClient
            themeClosed={themeClosed}
            themeOpen={themeOpen}
          />
        </Suspense>
        <nav className={[styles.navigation].join(' ')} role="navigation">
          <div className={styles.main}>
            <a className={styles.logo} href={homeUrl}>
              <span className="sr-only">Home</span>
              <span className={styles['logo-closed']}>
                {darkLogo || <LogoBlue />}
              </span>
              <span className={styles['logo-open']}>
                {logo || <LogoWhite />}
              </span>
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
              <TextLink>
                <button
                  type="button"
                  data-navigation-mobile-toggle
                  aria-expanded={false}
                >
                  <span className={styles['toggle-open']}>
                    <Icons iconName={'iconCross'} />
                  </span>
                  <span className={styles['toggle-closed']}>
                    <Icons iconName={'icon3Lines'} />
                  </span>
                  <span
                    className={'sr-only'}
                    data-navigation-mobile-toggle-label
                  >
                    Open navigation
                  </span>
                </button>
              </TextLink>
            </div>
          </div>
          <div className={styles.drawer} data-navigation-mobile-drawer>
            <BackButton type="menu">
              <>
                Back to <strong>Menu</strong>
              </>
            </BackButton>
            <BackButton type="secondary">
              <>
                Back to <strong data-navigation-mobile-active-primary-label />
              </>
            </BackButton>

            <div
              className={[styles.links, styles.primary].join(' ')}
              data-navigation-mobile-links
            >
              <ul>
                {mobileTabs.map((primary, primaryIndex) => {
                  const contentCount = primary.content?.length || 0;

                  if (primary.hasChildren) {
                    return (
                      <React.Fragment key={primaryIndex}>
                        <li
                          data-navigation-mobile-primary-item
                          data-navigation-mobile-primary-index={primaryIndex}
                        >
                          <TextLink full={true}>
                            <button
                              type="button"
                              data-navigation-type="mobileNavClick"
                              data-navigation-mobile-primary-button
                              data-navigation-mobile-primary-index={
                                primaryIndex
                              }
                              data-navigation-mobile-primary-label={
                                primary.heading
                              }
                              data-navigation-mobile-primary-content-count={
                                contentCount
                              }
                            >
                              <span>{primary.heading}</span>
                              <Icons iconName={'iconChevronRight'} />
                            </button>
                          </TextLink>
                        </li>
                        <li
                          className={[styles.grow, styles.hidden].join(' ')}
                          data-navigation-mobile-secondary-group
                          data-navigation-mobile-primary-index={primaryIndex}
                        >
                          <ul>
                            {primary.content?.map(
                              (secondary, secondaryIndex) => {
                                const secondaryLinkOnly = [
                                  'simple',
                                  'single',
                                ].includes(secondary.variation || '');

                                return (
                                  <React.Fragment key={secondaryIndex}>
                                    <li
                                      className={styles.hidden}
                                      data-navigation-mobile-secondary-item
                                      data-navigation-mobile-primary-index={
                                        primaryIndex
                                      }
                                      data-navigation-mobile-secondary-index={
                                        secondaryIndex
                                      }
                                    >
                                      <TextLink full={true}>
                                        {secondaryLinkOnly ? (
                                          <>{secondary.mobileCta}</>
                                        ) : (
                                          <button
                                            type="button"
                                            data-navigation-type="mobileSubNavClick"
                                            data-navigation-mobile-secondary-button
                                            data-navigation-mobile-primary-index={
                                              primaryIndex
                                            }
                                            data-navigation-mobile-secondary-index={
                                              secondaryIndex
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
                                        styles.hidden,
                                      ].join(' ')}
                                      data-navigation-mobile-tertiary-group
                                      data-navigation-mobile-primary-index={
                                        primaryIndex
                                      }
                                      data-navigation-mobile-secondary-index={
                                        secondaryIndex
                                      }
                                    >
                                      <ul>
                                        {secondary.links?.map(
                                          (tertiary, index) => (
                                            <li
                                              data-navigation-type="navigationLinkClickMobile"
                                              key={index}
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
                                        styles.hidden,
                                      ].join(' ')}
                                      data-navigation-mobile-secondary-bottom
                                      data-navigation-mobile-primary-index={
                                        primaryIndex
                                      }
                                      data-navigation-mobile-secondary-index={
                                        secondaryIndex
                                      }
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
                            className={[styles.bottom, styles.hidden].join(
                              ' '
                            )}
                            data-navigation-mobile-primary-bottom
                            data-navigation-mobile-primary-index={primaryIndex}
                            data-navigation-mobile-single-level={
                              contentCount <= 1
                            }
                          >
                            <Button size={'large'} variation={'outline'}>
                              {primary.mobileTabCta}
                            </Button>
                          </li>
                        )}
                      </React.Fragment>
                    );
                  }

                  return (
                    <React.Fragment key={primaryIndex}>
                      <li data-navigation-mobile-primary-item>
                        <TextLink full={true}>{primary.tabCta}</TextLink>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
            <div className={styles.eyebrow} data-navigation-mobile-eyebrow>
              <div
                className={styles['eyebrow-inner']}
                data-event="mobileNavigationClick"
                data-navigation-type="headerNavigationMobile"
              >
                {eyebrow?.left}
                {eyebrow?.right}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Themes>
  );
};

export default NavigationMobile;
