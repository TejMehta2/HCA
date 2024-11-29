/* eslint react/jsx-key: 0 */
import React from 'react';
import {
  Component,
  Result,
  TableOfContentsProps,
} from './TableOfContents.types';
import {
  PlaceholdersData,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import JumpToLinks, {
  JumpToAnchor,
} from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';

export const Default = (props: TableOfContentsProps): JSX.Element => {
  const context = useSitecoreContext();

  if (!context.sitecoreContext?.route?.placeholders) return <></>;

  const navigableComponents = getIncludedComponentsFromJson(
    context.sitecoreContext.route.placeholders
  );

  if (!navigableComponents) return <></>;

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <JumpToLinks
        heading={<Text variation="body-medium-medium">Jump to</Text>}
      >
        {navigableComponents.map((item, index) => {
          const componentId = generateHtmlSafeId(
            item.TitleValue,
            item.TableOfContentsLinkTitle
          );
          console.log('item.TitleValue', item.TitleValue);
          console.log(
            'item.TableOfContentsLinkTitle',
            item.TableOfContentsLinkTitle
          );

          return (
            <JumpToAnchor key={index}>
              <a href={'#' + componentId}>
                <Icons iconName="iconArrowSmallDown" />
                <span>{getFirstNonEmptyTitle(item)}</span>
              </a>
            </JumpToAnchor>
          );
        })}
      </JumpToLinks>
    </Themes>
  );
};

export function getFirstNonEmptyTitle(page: Result): string | undefined {
  return page.TableOfContentsLinkTitle || page.TitleValue;
}

function getIncludedComponentsFromJson(
  placeholders: PlaceholdersData
): Result[] {
  const supportedComponents = [
    'ImageShortText',
    'TextBlockComponent',
    'ContentCards',
    'PatientStoriesCards',
    'LocationCards',
  ];
  const components: Component[] = placeholders?.[
    'headless-main'
  ] as Component[];

  return components
    .filter(
      (component) =>
        supportedComponents.includes(component.componentName) &&
        component.params?.ExcludeFromTableOfContents !== '1'
    )
    .map((component) => ({
      componentName: component.componentName,
      TableOfContentsLinkTitle: component.params?.TableOfContentsLinkTitle,
      TitleValue:
        component.fields?.Title?.value ||
        component.fields?.data?.item?.title?.jsonValue?.value,
    }));
}
