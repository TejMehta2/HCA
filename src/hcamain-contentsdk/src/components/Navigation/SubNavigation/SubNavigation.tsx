import { type JSX } from 'react';
import {
  NavigablePagesFields,
  SubNavigationProps,
} from './SubNavigation.types';
import { Text as JssText } from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import JumpToLinks, {
  JumpToLink,
} from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import { isInsideContainerComponent } from 'lib/utility-functions/insideContainerComponent';

const SubNavigationDefaultComponent = (
  props: SubNavigationProps
): JSX.Element => {
  const { page } = props;
  const isEditing = page.mode.isEditing;
  if (isEditing) {
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
  if (!props.fields?.data?.item)
    return <SubNavigationDefaultComponent {...props} />;

  const contextItemId = props.page.layout.sitecore.route?.itemId;

  const datasource = props.fields.data.item;

  let navigablePages = datasource.rootPage?.targetItem?.children?.results || [];

  // Add root page If `includeRootPage` is true
  if (
    datasource.includeRootPage?.boolValue &&
    datasource.rootPage?.targetItem
  ) {
    navigablePages = [datasource.rootPage.targetItem, ...navigablePages];
  }

  // Do not include current page and pages where hideInSubNavigation checkbox is checked
  navigablePages = navigablePages.filter(
    (item: NavigablePagesFields) =>
      !item.hideInSubNavigation?.boolValue &&
      item.id.replaceAll(/[{\-}]/g, '').toLowerCase() !==
        contextItemId?.replaceAll(/[{\-}]/g, '').toLowerCase()
  );

  if (!navigablePages) return <SubNavigationDefaultComponent {...props} />;

  const defaultImage =
    datasource.defaultNavigationImage?.jsonValue?.value?.src || '';

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <JumpToLinks
        isInsideContainer={isInsideContainerComponent(props.params)}
        mobileHeading={props.fields?.data?.item?.title?.jsonValue?.value}
        heading={
          <Text variation="body-medium-medium">
            <JssText field={props.fields?.data?.item?.title?.jsonValue} />
          </Text>
        }
      >
        {navigablePages.map((item, index) => (
          <JumpToLink key={index}>
            <a href={item.url?.path}>
              <img src={getFirstNonEmptyImage(item, defaultImage)} alt="" />
              <span>{getFirstNonEmptyTitle(item)}</span>
            </a>
          </JumpToLink>
        ))}
      </JumpToLinks>
    </Themes>
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
