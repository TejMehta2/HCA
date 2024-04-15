import React from 'react';
import {
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

interface Fields {}

type ContainerComponentProps = {
  params?: Params;
  rendering: ComponentRendering;
  fields?: Fields;
};

export const Default = (props: ContainerComponentProps): JSX.Element => {
  const phKey = `container-component-${props.params?.DynamicPlaceholderId}`;
  return (
    <PlaceHolderWrapper>
      <Placeholder name={phKey} rendering={props.rendering} />
    </PlaceHolderWrapper>
  );
};
