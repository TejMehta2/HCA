/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import DualCTABlock from '@component-library/careers/DualCTABlock/DualCTABlock';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

type TextBlockComponentDuoProps = {
  params?: Params;
  rendering: ComponentRendering;
};

export const Default = (props: TextBlockComponentDuoProps): JSX.Element => {
  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const phKey = `cta-block-duo-${props?.params?.DynamicPlaceholderId}`;

  return (
    <DualCTABlock
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      content={
        <PlaceHolderWrapper>
          <Placeholder name={phKey} rendering={props.rendering} />
        </PlaceHolderWrapper>
      }
    />
  );
};
