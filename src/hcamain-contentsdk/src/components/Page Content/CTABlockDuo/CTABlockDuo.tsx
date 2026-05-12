import { type JSX } from 'react';
import componentMap from '.sitecore/component-map';
import { ComponentWithContextProps } from 'lib/component-props';
/* eslint-disable prettier/prettier */

import {
  ComponentRendering,
  AppPlaceholder,
} from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import DualCTABlock from '@component-library/careers/DualCTABlock/DualCTABlock';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

type TextBlockComponentDuoProps = ComponentWithContextProps & {
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
          <AppPlaceholder name={phKey} rendering={props.rendering} page={props.page} componentMap={componentMap} />
        </PlaceHolderWrapper>
      }
    />
  );
};
