/* eslint react/jsx-key: 0 */
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
import { inPageNavGlobalStore } from '@component-library/context/inPageNavGlobalStorage';

export const Default = (props: TableOfContentsProps): JSX.Element => {
  const [components, setComponentsList] = useState<NavigableComponent[]>(
    inPageNavGlobalStore.getList()
  );

  useEffect(() => {
    const handleNavigableComponentsListUpdated = (
      updatedList: NavigableComponent[]
    ) => {
      setComponentsList([...updatedList]);
    };

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

  console.log('t datasource', props.fields?.Title);

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
        {components.map((item, index) => {
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
