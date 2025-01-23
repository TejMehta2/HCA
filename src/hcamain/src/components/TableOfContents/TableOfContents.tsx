/* eslint react/jsx-key: 0 */
import React, { useEffect, useState } from 'react';
import Text from '@component-library/foundation/Text/Text';
import JumpToLinks, {
  JumpToAnchor,
} from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import { NavigableComponent } from './TableOfContents.types';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';

export const Default = (): JSX.Element => {
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

  return (
    <Themes theme={'A-HCA-White'} collapse={false}>
      <JumpToLinks
        heading={<Text variation="body-medium-medium">Jump to</Text>}
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
