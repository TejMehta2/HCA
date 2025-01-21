import React from 'react';
import {
  Field,
  RichText,
  Placeholder,
  ComponentRendering,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import CTABlock from '@component-library/site-components/CTABlock/CTABlock';
import Text from '@component-library/foundation/Text/Text';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
}

type CTABlockProps = {
  params?: Params;

  rendering?: ComponentRendering;
  fields?: Fields;
};

const CTABlockDefaultComponent = (props: CTABlockProps): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: CTABlockProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <CTABlockDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety
  const subheadingTag = props.params?.HeadingTag || 'h2';
  const headingTag = props.fields?.Heading?.value ? 'span' : subheadingTag;
  return (
    <CTABlock
      id={componentAnchorId}
      theme={props.params?.Theme || 'D-HCA-Teal'}
      subheader={
        <Text tag={subheadingTag} variation="subheading-1">
          <JSSText field={props.fields?.Heading} />
        </Text>
      }
      header={
        <Text tag={headingTag} variation={props.params?.HeadingSize}>
          <JSSText field={props.fields?.Title} />
        </Text>
      }
      ctas={
        props.rendering && (
          <Placeholder
            name={phKey}
            rendering={props.rendering}
            size={buttonSize}
          />
        )
      }
      children={
        <Text tag="div" variation="body-large">
          <RichText tag="p" field={props.fields?.Text}></RichText>
        </Text>
      }
    />
  );
};
