import React from 'react';
import {
  Field,
  RichText as JssRichText,
  Text as JssText,
  useSitecoreContext,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import TextBlock from '@component-library/site-components/TextBlock/TextBlock';
import Text from '@component-library/foundation/Text/Text';
import Themes from '@component-library/foundation/Themes/Themes';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
}

type TextBlockComponentProps = {
  params?: Params;
  rendering: ComponentRendering;
  fields?: Fields;
};

const TextBlockComponentDefaultComponent = (
  props: TextBlockComponentProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Text Block Component please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TextBlockComponentProps): JSX.Element => {
  const phKey = `text-block-component-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <TextBlockComponentDefaultComponent {...props} />;
  }

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <TextBlock
        subheading={
          props.fields?.Heading?.value && (
            <Text variation={'subheading-1'}>
              <JssText field={props.fields?.Heading} />
            </Text>
          )
        }
        title={
          props.fields?.Title?.value && (
            <Text
              variation={props.params?.HeadingSize || 'display-2'}
              tag={props.params?.HeadingTag || 'h2'}
            >
              <JssText field={props.fields?.Title} />
            </Text>
          )
        }
        text={
          props.fields?.Text?.value && (
            <RichText>
              <JssRichText field={props.fields?.Text} />
            </RichText>
          )
        }
        ctas={
          <PlaceHolderWrapper>
            <Placeholder name={phKey} rendering={props.rendering} />
          </PlaceHolderWrapper>
        }
      />
    </Themes>
  );
};
