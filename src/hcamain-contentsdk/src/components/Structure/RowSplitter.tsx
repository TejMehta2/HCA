import React, { type JSX } from 'react';
import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import { RichTextElement } from '@component-library/core-components/RichText/RichText';
import { ComponentWithContextProps } from 'lib/component-props';
import componentMap from '.sitecore/component-map';

export const Default = (props: ComponentWithContextProps): JSX.Element => {
  const rowStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];
  const enabledPlaceholders = props.params.EnabledPlaceholders?.split(',') ?? [];
  const id = props.params.RenderingIdentifier;

  return (
    <RichTextElement
      additionalStyles={[props.params.GridParameters, props.params.Styles]}
      id={id ? id : undefined}
    >
      {enabledPlaceholders.map((ph: string, index: number) => {
        const phKey = `row-${ph}-{*}`;
        const phStyles = `${rowStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <RichTextElement key={index} additionalStyles={[phStyles, 'row']}>
            <AppPlaceholder
              key={index}
              name={phKey}
              rendering={props.rendering}
              page={props.page}
              componentMap={componentMap}
            />
          </RichTextElement>
        );
      })}
    </RichTextElement>
  );
};
