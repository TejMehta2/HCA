/* eslint react/jsx-key: 0 */
import React from 'react';
import Navigation from '@component-library/site-components/Navigation/Navigation';
import {
  NavigationEyebrow,
  NavigationTab,
} from '@component-library/site-components/Navigation/Navigation.types';
import {
  MainNavigationProps,
  MainNavigationTabChild,
} from './MainNavigation.types';
import {
  Link as JssLink,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';

const MainNavigationDefaultComponent = (
  props: MainNavigationProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Empty Nav</span>
    </div>
  </div>
);

const TabChildHeading = (props: MainNavigationTabChild) => {
  const { cta, title, template } = props;
  if (template?.name === 'Navigation Blog Post Card' && cta?.jsonValue) {
    // Combine heading and CTA for blog cards to have a link as heading
    return (
      <JssLink field={cta?.jsonValue}>
        <JssText field={title} />
      </JssLink>
    );
  }
  return <JssText field={title} />;
};

export const Default = (props: MainNavigationProps): JSX.Element => {
  if (!props.fields) return <MainNavigationDefaultComponent {...props} />;
  const tabs: NavigationTab[] =
    props.fields?.data?.item?.navigationTabs?.targetItems?.map((tab) => ({
      heading: tab?.tabTitle?.value || '',
      content:
        tab?.children?.results?.map((child) => ({
          variation: child?.variant?.targetItem?.value?.value,
          template: child?.template?.name || 'Main Navigation Links List',
          heading: <TabChildHeading {...child} />,
          description: <JssText field={child?.description} />,
          date: child?.date?.jsonValue ? (
            <JssDate field={child?.date?.jsonValue} />
          ) : undefined,
          tag: <JssText field={child?.tag} />,
          links: child?.children?.results?.map((result, index) => (
            <TextLink key={index} variation={'body-large'}>
              {result?.link?.jsonValue && (
                <JssLink field={result?.link?.jsonValue} />
              )}
            </TextLink>
          )),
          cta: child?.cta?.jsonValue ? (
            <JssLink field={child?.cta?.jsonValue} />
          ) : (
            <></>
          ),
          mobileCta:
            child?.cta?.jsonValue?.value?.href && child?.mobileCtaText ? (
              <JssLink field={child?.cta?.jsonValue}>
                <JssText field={child?.mobileCtaText} />
              </JssLink>
            ) : undefined,
        })) || [],
      mobileTabCta: tab?.mobileTabCta?.jsonValue?.value?.href ? (
        <JssLink field={tab?.mobileTabCta?.jsonValue} />
      ) : undefined,
      tabCta: tab?.tabCta?.jsonValue?.value?.href ? (
        <JssLink field={tab?.tabCta?.jsonValue}>
          <JssText field={tab?.tabTitle} />
        </JssLink>
      ) : undefined,

      hasChildren: tab.hasChildren,
    })) || [];

  const eyebrow: NavigationEyebrow = {
    left: (
      <>
        {props?.fields?.data?.item?.primaryComplementaryLinksFolder?.targetItem?.links?.targetItems?.map(
          (link, index) => (
            <TextLink key={index} variation={'body-medium'}>
              {link?.link?.jsonValue && (
                <JssLink field={link?.link?.jsonValue} />
              )}
            </TextLink>
          )
        )}
      </>
    ),
    right: (
      <>
        {props?.fields?.data?.item?.secondaryComplementaryLinksFolder?.targetItem?.links?.targetItems?.map(
          (link, index) => (
            <TextLink key={index} variation={'body-medium'}>
              {link?.link?.jsonValue && (
                <JssLink field={link?.link?.jsonValue} />
              )}
            </TextLink>
          )
        )}
      </>
    ),
  };
  return (
    <Navigation
      tabs={tabs}
      eyebrow={eyebrow}
      search={
        <TextLink>
          <button>
            <Icons iconName={'iconSearch'} />
            <span className="sr-only">Search</span>
          </button>
        </TextLink>
      }
    />
  );
};
