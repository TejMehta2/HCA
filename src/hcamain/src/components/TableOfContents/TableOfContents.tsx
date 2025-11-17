/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Text from '@component-library/foundation/Text/Text';
import { Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import JumpToLinks, { JumpToAnchor } from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import { TableOfContentsProps, NavigableComponent } from './TableOfContents.types';
import router from 'next/router';

export const Default = (props: TableOfContentsProps): JSX.Element => {
  const [components, setComponentsList] = useState<NavigableComponent[]>([]);

  useEffect(() => {
    const handleRouteChange = () => {
      buildToC();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  // Initial scan
  useEffect(() => {
    buildToC();
  }, []);

  const buildToC = () => {
    // Scan DOM for elements with data-subnav-link-title
    const elements = document.querySelectorAll<HTMLElement>('[data-subnav-link-title]');
    // console.log('[ToC] Found elements:', elements);

    const tocComponents: NavigableComponent[] = Array.from(elements).map(el => {
      const item = {
        TableOfContentsLinkTitle: el.dataset.subnavLinkTitle || '',
        Id: el.dataset.subnavLinkId || el.id || '', // fallback to id if not present
      };
      return item;
    });

    console.log('[ToC] Final array:', tocComponents);
    setComponentsList(tocComponents);
  };

  const hasNoDatasource = !props.fields;

  return (
    <Themes theme={'A-HCA-White'} collapse={false}>
      <JumpToLinks
        heading={
          hasNoDatasource ? (
            <Text variation="body-medium-medium">Jump to</Text>
          ) : (
            <Text variation="body-medium-medium">
              <JssText field={props.fields?.Title} />
            </Text>
          )
        }
      >
        {components.length > 0 &&
          components.map((item, index) => (
            <JumpToAnchor key={index}>
              <a href={'#' + item.Id}>
                <Icons iconName="iconArrowSmallDown" />
                <span>{item.TableOfContentsLinkTitle}</span>
              </a>
            </JumpToAnchor>
          ))}
      </JumpToLinks>
    </Themes>
  );
};
