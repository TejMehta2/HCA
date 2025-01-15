/* eslint react/jsx-key: 0 */
import React from 'react';
import { TableOfContentsProps } from './TableOfContents.types';
import Text from '@component-library/foundation/Text/Text';
import JumpToLinks, {
  JumpToAnchor,
} from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import { useInPageNavigationContext } from '../../context/InPageNavigationContext';

export const Default = (props: TableOfContentsProps): JSX.Element => {
  const { components } = useInPageNavigationContext();

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
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
