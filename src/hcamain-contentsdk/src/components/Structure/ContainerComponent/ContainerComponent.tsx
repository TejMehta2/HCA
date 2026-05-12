import { type JSX } from 'react';
import {
  ComponentRendering,
  AppPlaceholder,
} from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';
import TextBlockContainer from '@component-library/site-components/TextBlockContainer/TextBlockContainer';
import { RichTextElement } from '@component-library/core-components/RichText/RichText';
import componentMap from '.sitecore/component-map';
import { ComponentWithContextProps } from 'lib/component-props';
import { setInsideContainerComponentParam } from 'lib/utility-functions/insideContainerComponent';

type ContainerComponentProps = ComponentWithContextProps & {
  params?: Params;
  rendering: ComponentRendering;
};

export const Default = (props: ContainerComponentProps): JSX.Element => {
  const phKey = `container-component-${props.params?.DynamicPlaceholderId}`;

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <TextBlockContainer>
        <RichTextElement additionalStyles={'grid'}>
          <AppPlaceholder
            name={phKey}
            rendering={props.rendering}
            page={props.page}
            componentMap={componentMap}
            modifyComponentProps={setInsideContainerComponentParam}
          />
        </RichTextElement>
      </TextBlockContainer>
    </Themes>
  );
};
