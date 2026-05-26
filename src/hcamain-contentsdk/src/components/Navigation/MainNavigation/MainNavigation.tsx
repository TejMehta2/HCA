import { type JSX } from 'react';
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
  Image,
} from '@sitecore-content-sdk/nextjs';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import MainNavigationSearchModalClient from './MainNavigationSearchModalClient';
import MainNavigationSearchTriggerClient from './MainNavigationSearchTriggerClient';

const MainNavigationDefaultComponent = (
  props: MainNavigationProps
): JSX.Element => {
  const { page } = props;
  const isEditing = page.mode.isEditing;
  if (isEditing) {
    return (
      <div className={`component ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Nain Navigation. Please click to select datasource.
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const TabChildHeading = (props: MainNavigationTabChild) => {
  const { cta, title, template } = props;
  if (template?.name === 'Navigation Blog Post Card' && cta?.jsonValue) {
    // Combine heading and CTA for blog cards to have a link as heading
    return (
      <JssLink field={cta?.jsonValue} editable={false}>
        <JssText field={title} />
      </JssLink>
    );
  }
  return <JssText field={title} />;
};

const isCareersRoute = (itemPath?: string) => {
  const normalizedPath = itemPath?.toLowerCase().replace(/^\/+|\/+$/g, '');

  return (
    normalizedPath === 'careers' || normalizedPath?.startsWith('careers/')
  );
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
          description: <JssText field={child?.description} editable={false} />,
          date: child?.date?.jsonValue ? (
            <JssDate field={child?.date?.jsonValue} editable={false} />
          ) : undefined,
          tag: <JssText field={child?.tag} editable={false} />,
          links: child?.links?.targetItems?.map((result, index) => (
            <TextLink key={index} variation={'body-large'}>
              {result?.link?.jsonValue && (
                <JssLink field={result?.link?.jsonValue} editable={false} />
              )}
            </TextLink>
          )),
          cta: child?.cta?.jsonValue ? (
            <JssLink
              key={`navigation-child-cta-${child?.cta?.jsonValue?.value?.href || child?.title?.value || ''}`}
              field={child?.cta?.jsonValue}
              editable={false}
            />
          ) : (
            <></>
          ),
          mobileCta: child?.cta?.jsonValue?.value?.href ? (
            <JssLink
              key={`navigation-child-mobile-cta-${child?.cta?.jsonValue?.value?.href || child?.title?.value || ''}`}
              field={child?.cta?.jsonValue}
              editable={false}
            >
              {child?.mobileCtaText?.value ? (
                <JssText field={child?.mobileCtaText} editable={false} />
              ) : (
                <JssText field={child?.title} editable={false} />
              )}
            </JssLink>
          ) : undefined,
          showOnMobile: child?.showOnMobile?.boolValue || false,
        })) || [],
      mobileTabCta: tab?.mobileTabCta?.jsonValue?.value?.href ? (
        <JssLink
          key={`navigation-mobile-tab-cta-${tab?.mobileTabCta?.jsonValue?.value?.href || tab?.tabTitle?.value || ''}`}
          field={tab?.mobileTabCta?.jsonValue}
          editable={false}
        />
      ) : undefined,
      tabCta: tab?.tabCta?.jsonValue?.value?.href ? (
        <JssLink
          key={`navigation-tab-cta-${tab?.tabCta?.jsonValue?.value?.href || tab?.tabTitle?.value || ''}`}
          field={tab?.tabCta?.jsonValue}
          editable={false}
        >
          <JssText field={tab?.tabTitle} editable={false} />
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
                <JssLink field={link?.link?.jsonValue} editable={false} />
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
                <JssLink field={link?.link?.jsonValue} editable={false} />
              )}
            </TextLink>
          )
        )}
      </>
    ),
  };

  const searchModalConfig =
    props.fields.data?.item?.searchModalConfigurationFolder?.targetItem;
  const searchRedirectUrl =
    searchModalConfig?.baseUrl?.jsonValue?.value?.href;
  const homeUrl = isCareersRoute(
    props.page.layout.sitecore.context.itemPath
  )
    ? '/careers'
    : '/';

  return (
    <>
      <Navigation
        themeClosed={props.params?.Theme || 'I-HCA-Goldenrod'}
        themeOpen={props.params?.ThemeOpen || 'B-HCA-Navy-Blue'}
        tabs={tabs}
        homeUrl={homeUrl}
        logo={
          props?.fields?.data?.item?.logo?.jsonValue?.value &&
          props.fields.data.item.logo.jsonValue.value['class'] !==
            'scEmptyImage' &&
          props.fields.data.item.logo.jsonValue.value.src &&
          props.fields.data.item.logo.jsonValue.value.src.trim() !== '' ? (
            <Image
              field={props.fields.data.item.logo.jsonValue.value}
              editable={false}
            />
          ) : null
        }
        darkLogo={
          props?.fields?.data?.item?.darkLogo?.jsonValue?.value &&
          props.fields.data.item.darkLogo.jsonValue.value['class'] !==
            'scEmptyImage' &&
          props.fields.data.item.darkLogo.jsonValue.value.src &&
          props.fields.data.item.darkLogo.jsonValue.value.src.trim() !== '' ? (
            <Image
              field={props.fields.data.item.darkLogo.jsonValue.value}
              editable={false}
            />
          ) : null
        }
        eyebrow={eyebrow}
        search={
          searchRedirectUrl ? (
            <MainNavigationSearchTriggerClient />
          ) : undefined
        }
      />
      {searchRedirectUrl && (
        <MainNavigationSearchModalClient
          placeholder={searchModalConfig?.searchPlaceholder?.value || ''}
          popularSearchesLabel={
            searchModalConfig?.popularSearchesLabel?.value || ''
          }
          redirectUrl={searchRedirectUrl}
          suggestions={
            searchModalConfig?.popularSearches?.PopularSearch?.map(
              (search) => ({
                iconSvg: search?.icon?.Icon?.svgMarkup?.value,
                text: search?.text?.value,
                query: search?.text?.value,
              })
            ) || []
          }
        />
      )}
    </>
  );
};
