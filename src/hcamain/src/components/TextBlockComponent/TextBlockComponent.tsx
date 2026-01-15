/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  RichText as JssRichText,
  Text as JssText,
  useSitecoreContext,
  ComponentRendering,
  Placeholder,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import TextBlock from '@component-library/site-components/TextBlock/TextBlock';
import Text from '@component-library/foundation/Text/Text';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import OffsetTextBlock from '@component-library/careers/OffsetTextBlock/OffsetTextBlock';
import { getPresentationParam } from 'lib/utility-functions/getPresentationParam';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
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
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <TextBlockComponentDefaultComponent {...props} />;
  }

  const componentTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    componentTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || componentTitle;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );

  const centered =
    props?.params?.styles &&
    props?.params?.styles?.split(' ').indexOf('position-center') !== -1;

  const textWidth = (getPresentationParam(props?.params?.styles, 'textwidth') ??
    'standard') as 'narrow' | 'standard' | undefined;

  return (
    <TextBlock
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation={centered ? 'centered' : undefined}
      textWidth={textWidth}
      subheading={
        (props.fields?.Heading?.value || isExperienceEditor) && (
          <Text tag={subheadingTag} variation={'subheading-1'}>
            <JssText field={props.fields?.Heading} />
          </Text>
        )
      }
      title={
        (props.fields?.Title?.value || isExperienceEditor) && (
          <>
            <Text
              variation={props.params?.HeadingSize || 'display-3'}
              tag={headingTag}
            >
              <JssRichText field={props.fields?.Title} />
            </Text>
          </>
        )
      }
      text={
        (props.fields?.Text?.value || isExperienceEditor) && (
          <RichText>
            <JssRichText field={props.fields?.Text} />
          </RichText>
        )
      }
      image={
        props.fields?.Image || isExperienceEditor ? (
          <NextJssImage
            field={props.fields?.Image}
            next={{
              width: '1512',
              height: '814',
              loading: 'eager',
              priority: true,
            }}
          />
        ) : undefined
      }
      ctas={
        <PlaceHolderWrapper>
          <Placeholder name={phKey} rendering={props.rendering} />
        </PlaceHolderWrapper>
      }
    />
  );
};

export const Offset = (props: TextBlockComponentProps): JSX.Element => {
  const phKey = `text-block-component-${props.params?.DynamicPlaceholderId}`;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <TextBlockComponentDefaultComponent {...props} />;
  }

  const componentTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    componentTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || componentTitle;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <OffsetTextBlock
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      subheading={
        (props.fields?.Heading?.value || isExperienceEditor) && (
          <Text tag={subheadingTag} variation={'subheading-1'}>
            <JssText field={props.fields?.Heading} />
          </Text>
        )
      }
      title={
        (props.fields?.Title?.value || isExperienceEditor) && (
          <>
            <Text
              variation={props.params?.HeadingSize || 'display-1'}
              tag={headingTag}
            >
              <JssRichText field={props.fields?.Title} />
            </Text>
          </>
        )
      }
      bodyCopy={
        (props.fields?.Text?.value || isExperienceEditor) && (
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
  );
};
