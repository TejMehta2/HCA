import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { RichTextElement } from '@component-library/core-components/RichText/RichText';
import ContainerWrapper from 'src/jss-abstractions/ContainerWrapper/ContainerWrapper';
import { ColumnSplitterContext } from '@component-library/context/columnSplitterContext';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
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

  const enabledPlaceholders = props.params.EnabledPlaceholders.split(',');
  const id = props.params.RenderingIdentifier;
  const hasMultipleColumns = enabledPlaceholders.length > 1;

  return (
    <ColumnSplitterContext.Provider value={{ hasMultipleColumns }}>
      <ContainerWrapper>
        <RichTextElement
          id={id ? id : undefined}
          additionalStyles={[
            'grid',
            props.params.GridParameters,
            props.params.Styles,
          ]}
        >
          {enabledPlaceholders.map((ph, index) => {
            const phKey = `column-${ph}-{*}`;
            const phStyles = `${columnWidths[+ph - 1]} ${
              columnStyles[+ph - 1] ?? ''
            }`.trimEnd();

            return (
              <RichTextElement key={index} additionalStyles={phStyles}>
                <Placeholder
                  key={index}
                  name={phKey}
                  rendering={props.rendering}
                />
              </RichTextElement>
            );
          })}
        </RichTextElement>
      </ContainerWrapper>
    </ColumnSplitterContext.Provider>
  );
};
