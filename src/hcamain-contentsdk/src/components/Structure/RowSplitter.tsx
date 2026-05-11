import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { RichTextElement } from '@component-library/core-components/RichText/RichText';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
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
  const enabledPlaceholders = props.params.EnabledPlaceholders.split(',');
  const id = props.params.RenderingIdentifier;

  return (
    <RichTextElement
      additionalStyles={[props.params.GridParameters, props.params.Styles]}
      id={id ? id : undefined}
    >
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `row-${ph}-{*}`;
        const phStyles = `${rowStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <RichTextElement key={index} additionalStyles={[phStyles, 'row']}>
            <Placeholder key={index} name={phKey} rendering={props.rendering} />
          </RichTextElement>
        );
      })}
    </RichTextElement>
  );
};
