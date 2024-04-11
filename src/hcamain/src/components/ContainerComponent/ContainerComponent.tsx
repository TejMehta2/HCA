import React from 'react';
import {
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';
import TextBlockContainer from '@component-library/site-components/TextBlockContainer/TextBlockContainer';
import { RichTextElement } from '@component-library/core-components/RichText/RichText';

interface Fields {}

type ContainerComponentProps = {
  params?: Params;
  rendering: ComponentRendering;
  fields?: Fields;
};

export const Default = (props: ContainerComponentProps): JSX.Element => {
  const phKey = `container-component-${props.params?.DynamicPlaceholderId}`;

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <TextBlockContainer>
        <RichTextElement additionalStyles={'grid'}>
          <Placeholder name={phKey} rendering={props.rendering} />
        </RichTextElement>
      </TextBlockContainer>
    </Themes>
  );
};
