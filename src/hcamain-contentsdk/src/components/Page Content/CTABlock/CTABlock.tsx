import { type JSX } from 'react';
import componentMap from '.sitecore/component-map';
import { ComponentWithContextProps } from 'lib/component-props';

import {
  Field,
  RichText,
  AppPlaceholder,
  ComponentRendering,
  Text as JSSText,
} from '@sitecore-content-sdk/nextjs';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import CTABlock from '@component-library/site-components/CTABlock/CTABlock';
import Text from '@component-library/foundation/Text/Text';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
}

type CTABlockProps = ComponentWithContextProps & {
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
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <CTABlock
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
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
          <AppPlaceholder
            name={phKey}
            rendering={props.rendering}
            page={props.page}
            componentMap={componentMap}
            passThroughComponentProps={{ size: buttonSize }}
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
