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
  const [components, setComponentsList] = useState<NavigableComponent[]>(() => {
    const initialList = inPageNavGlobalStore.getList();
    console.log('[ToC] Initial state:', initialList);
    return initialList;
  });

  // Clear list on route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log('[ToC] Route change started. URL:', url);
      inPageNavGlobalStore.clearList();
      setComponentsList([]);
      console.log('[ToC] List cleared after route change.');
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  // Listen for updates from global store
  useEffect(() => {
    const handleNavigableComponentsListUpdated = (updatedList: NavigableComponent[]) => {
      console.log('[ToC] Global store updated:', updatedList);
      setComponentsList([...updatedList]);
    };
    const currentList = inPageNavGlobalStore.getList();
    console.log('[ToC] Sync on mount:', currentList);
    setComponentsList([...currentList]);
    inPageNavGlobalStore.on('navigableComponentsListUpdated', handleNavigableComponentsListUpdated);
    return () => {
      inPageNavGlobalStore.off('navigableComponentsListUpdated', handleNavigableComponentsListUpdated);
    };
  }, []);

  // Sync whenever URL changes (catch hash or query updates)
  useEffect(() => {
    const listOnUrlChange = inPageNavGlobalStore.getList();
    console.log('[ToC] URL changed, syncing list:', router.asPath, listOnUrlChange);
    setComponentsList([...listOnUrlChange]);
  }, [router.asPath]);

  const hasNoDatasource = !props.fields;

  console.log('[ToC] Rendering with components:', components);

  return (
    <Themes theme="A-HCA-White" collapse={false}>
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
        {components.map(item => (
          <JumpToAnchor key={item.Id}>
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

