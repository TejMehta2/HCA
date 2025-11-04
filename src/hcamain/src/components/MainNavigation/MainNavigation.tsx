/* eslint-disable prettier/prettier */
/* eslint react/jsx-key: 0 */
import React, { useRef } from 'react';
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
  useSitecoreContext,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import ModalSearch from '@component-library/yext/ModalSearch/ModalSearch';
import { SEARCH_SUGGESTIONS_MODAL_ID } from 'lib/constants';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';

const MainNavigationDefaultComponent = (
  props: MainNavigationProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
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

export const Default = (props: MainNavigationProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
            <JssLink field={child?.cta?.jsonValue} editable={false} />
          ) : (
            <></>
          ),
          mobileCta: child?.cta?.jsonValue?.value?.href ? (
            <JssLink field={child?.cta?.jsonValue} editable={false}>
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
        <JssLink field={tab?.mobileTabCta?.jsonValue} editable={false} />
      ) : undefined,
      tabCta: tab?.tabCta?.jsonValue?.value?.href ? (
        <JssLink field={tab?.tabCta?.jsonValue} editable={false}>
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

  return (
    <>
      <Navigation
        themeClosed={props.params?.Theme || 'I-HCA-Goldenrod'}
        themeOpen={props.params?.ThemeOpen || 'B-HCA-Navy-Blue'}
        tabs={tabs}
        logo={props?.fields?.data?.item?.logo?.jsonValue?.value
          ? <Image field={props.fields.data.item.logo.jsonValue.value} />
          : null}
        darkLogo={props?.fields?.data?.item?.darkLogo?.jsonValue?.value
          ? <Image field={props.fields.data.item.darkLogo.jsonValue.value} />
          : null}
        eyebrow={eyebrow}
        search={
          searchModalConfig?.baseUrl?.jsonValue?.value?.href ? (
            <TextLink>
              <button
                onClick={() => {
                  const dialog = document.getElementById(
                    SEARCH_SUGGESTIONS_MODAL_ID
                  ) as HTMLDialogElement;
                  dialog?.showModal();
                }}
              >
                <Icons iconName={'iconSearch'} />
                <span className="sr-only">Search</span>
              </button>
            </TextLink>
          ) : undefined
        }
      />
      <Themes theme={'A-HCA-White'}>
        <ModalSearch
          id={SEARCH_SUGGESTIONS_MODAL_ID}
          ref={dialogRef}
          placeholder={searchModalConfig?.searchPlaceholder?.value || ''}
          subheading={
            searchModalConfig?.popularSearchesLabel ? (
              <Text variation={'subheading-1'}>
                <JssText
                  field={searchModalConfig?.popularSearchesLabel}
                  editable={false}
                />
              </Text>
            ) : undefined
          }
          redirectUrl={searchModalConfig?.baseUrl?.jsonValue?.value.href}
          suggestions={
            searchModalConfig?.popularSearches?.PopularSearch?.map(
              (search) => ({
                icon: (
                  <SitecoreSvg>
                    {search?.icon?.Icon?.svgMarkup?.value}
                  </SitecoreSvg>
                ),
                text: <JssText field={search.text} editable={false} />,
                query: search?.text?.value,
              })
            ) || []
          }
        />
      </Themes>
    </>
  );
};
