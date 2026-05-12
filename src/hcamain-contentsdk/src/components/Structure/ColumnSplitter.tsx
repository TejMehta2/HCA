import { type JSX } from 'react';
import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import { RichTextElement } from '@component-library/core-components/RichText/RichText';
import ContainerWrapper from 'src/jss-abstractions/ContainerWrapper/ContainerWrapper';
import { ComponentWithContextProps } from 'lib/component-props';
import { setInsideContainerComponentParam } from 'lib/utility-functions/insideContainerComponent';
import componentMap from '.sitecore/component-map';

export const Default = (props: ComponentWithContextProps): JSX.Element => {
  const columnWidths = [
    props.params.ColumnWidth1,
    props.params.ColumnWidth2,
    props.params.ColumnWidth3,
    props.params.ColumnWidth4,
    props.params.ColumnWidth5,
    props.params.ColumnWidth6,
    props.params.ColumnWidth7,
    props.params.ColumnWidth8,
  ];

  const columnStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];

  const enabledPlaceholders =
    props.params.EnabledPlaceholders?.split(',') ?? [];
  const id = props.params.RenderingIdentifier;

  return (
    <ContainerWrapper>
      <RichTextElement
        id={id ? id : undefined}
        additionalStyles={[
          'grid',
          props.params.GridParameters,
          props.params.Styles,
        ]}
      >
        {enabledPlaceholders.map((ph: string, index: number) => {
          const phKey = `column-${ph}-{*}`;
          const phStyles = `${columnWidths[+ph - 1]} ${
            columnStyles[+ph - 1] ?? ''
          }`.trimEnd();
          return (
            <RichTextElement key={index} additionalStyles={phStyles}>
              <AppPlaceholder
                key={index}
                name={phKey}
                rendering={props.rendering}
                page={props.page}
                componentMap={componentMap}
                modifyComponentProps={setInsideContainerComponentParam}
              />
            </RichTextElement>
          );
        })}
      </RichTextElement>
    </ContainerWrapper>
  );
};
