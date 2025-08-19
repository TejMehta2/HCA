/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Text from '@component-library/foundation/Text/Text';
import { Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import JumpToLinks, {
  JumpToAnchor,
} from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import {
  NavigableComponent,
  TableOfContentsProps,
} from './TableOfContents.types';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import router from 'next/router';

export const Default = (props: TableOfContentsProps): JSX.Element => {
  const [components, setComponentsList] = useState<NavigableComponent[]>([]);

  // Clear list when component mounts (i.e., on each page visit)
  useEffect(() => {
    const handleRouteChange = () => {
      console.log('[ToC] Route and url changed. Clearing list.');
      inPageNavGlobalStore.clearList();
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.asPath]);

  useEffect(() => {
    console.log('test');
  }, []);

  useEffect(() => {
    const handleNavigableComponentsListUpdated = (
      updatedList: NavigableComponent[]
    ) => {
      console.log('[ToC] Received updated list', updatedList);
      setComponentsList([...updatedList]);
    };
    // Sync immediately on mount
    const currentList = inPageNavGlobalStore.getList();
    console.log('[ToC] Initial list on mount', currentList);
    setComponentsList([...currentList]);
    inPageNavGlobalStore.on(
      'navigableComponentsListUpdated',
      handleNavigableComponentsListUpdated
    );
    return () => {
      inPageNavGlobalStore.off(
        'navigableComponentsListUpdated',
        handleNavigableComponentsListUpdated
      );
    };
  }, []);

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
        {components.length > 0 && components.map((item, index) => {
          return (
            <JumpToAnchor key={index}>
              <a href={'#' + item.Id}>
                <Icons iconName="iconArrowSmallDown" />
                <span>{item.TableOfContentsLinkTitle}</span>
              </a>
            </JumpToAnchor>
          );
        })}
      </JumpToLinks>
    </Themes>
  );
};
