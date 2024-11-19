/* eslint react/jsx-key: 0 */
import React from 'react';
import {
  NavigablePagesFields,
  SubNavigationProps,
} from './SubNavigation.types';
import {
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import JumpToLinks, {
  JumpToLink,
} from 'temp/component-library/site-components/JumpToLinks/JumpToLinks';

const SubNavigationDefaultComponent = (
  props: SubNavigationProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Sub Navigation. Please click to select datasource.
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: SubNavigationProps): JSX.Element => {
  if (!props.fields) return <SubNavigationDefaultComponent {...props} />;

  const defaultImage =
    props.fields?.data?.item?.defaultNavigationImage?.jsonValue?.value?.src ||
    '';

  return (
    <JumpToLinks
      heading={
        <Text variation="body-medium-medium">
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
    >
      {props.fields?.data?.item?.rootPage?.targetItem?.children?.results
        ?.filter(
          (item: NavigablePagesFields) => !item.hideInSubNavigation?.boolValue
        )
        .map((item, index) => (
          <JumpToLink key={index}>
            <a href={item.url?.path}>
              <img src={getFirstNonEmptyImage(item, defaultImage)} alt="" />
              <span>{getFirstNonEmptyTitle(item)}</span>
            </a>
          </JumpToLink>
        ))}
    </JumpToLinks>
  );
};

export function getFirstNonEmptyTitle(
  page: NavigablePagesFields
): string | undefined {
  return (
    page.navigationTitle?.value ||
    page.abstractTitle?.value ||
    page.title?.value
  );
}

export function getFirstNonEmptyImage(
  page: NavigablePagesFields,
  defaultImage: string
): string {
  const imageUrl =
    page.abstractImage?.jsonValue.value?.src ||
    page.image?.jsonValue.value?.src ||
    defaultImage;

  return appendQueryParam(imageUrl);
}

export function appendQueryParam(url: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('t', 'c100');
    return urlObj.toString();
  } catch (error) {
    console.error('Invalid image URL provided:', error);
    return url;
  }
}
