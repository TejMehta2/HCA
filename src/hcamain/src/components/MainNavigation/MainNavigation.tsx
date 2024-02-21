/* eslint react/jsx-key: 0 */
import React from 'react';
import Navigation from '@component-library/site-components/Navigation/Navigation';
import {
  NavigationEyebrow,
  NavigationTab,
} from '@component-library/site-components/Navigation/Navigation.types';
import { MainNavigationProps } from './MainNavigation.types';
import {
  Link as JssLink,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';

const MainNavigationfaultComponent = (
  props: MainNavigationProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Empty Nav</span>
    </div>
  </div>
);

export const Default = (props: MainNavigationProps): JSX.Element => {
  if (!props.fields) return <MainNavigationfaultComponent {...props} />;
  const tabs: NavigationTab[] =
    props.fields.data.item.navigationTabs?.targetItems.map((tab) => ({
      heading: tab.tabTitle.value,
      content: tab.children.results.map((child) => ({
        variation: child.variant?.targetItem?.value.value,
        template: child.template.name,
        heading: child.title.value,
        description: <JssText field={child.description} />,
        date: child.date?.jsonValue ? (
          <JssDate field={child.date?.jsonValue} />
        ) : undefined,
        tag: <JssText field={child.tag} />,
        links: child.children?.results.map((result) => (
          <TextLink variation={'body-large'}>
            <JssLink field={result.link.jsonValue} />
          </TextLink>
        )),
        cta: <JssLink field={child.cta.jsonValue} />,
        mobileCta: child.cta.jsonValue.value.href ? (
          <JssLink field={child.cta.jsonValue} />
        ) : undefined,
      })),
      mobileCta: tab.mobileTabCta.jsonValue.value.href ? (
        <JssLink field={tab.mobileTabCta.jsonValue} />
      ) : undefined,
      cta: tab.tabCta.jsonValue.value.href ? (
        <JssLink field={tab.tabCta.jsonValue}>
          <JssText field={tab.tabTitle} />
        </JssLink>
      ) : undefined,

      hasChildren: tab.hasChildren,
    }));

  const eyebrow: NavigationEyebrow = {
    left: (
      <>
        {props.fields.data.item.primaryComplementaryLinksFolder.targetItem.links.targetItems.map(
          (link) => (
            <TextLink variation={'body-medium'}>
              <JssLink field={link.link.jsonValue} />
            </TextLink>
          )
        )}
      </>
    ),
    right: (
      <>
        {props.fields.data.item.secondaryComplementaryLinksFolder.targetItem.links.targetItems.map(
          (link) => (
            <TextLink variation={'body-medium'}>
              <JssLink field={link.link.jsonValue} />
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
