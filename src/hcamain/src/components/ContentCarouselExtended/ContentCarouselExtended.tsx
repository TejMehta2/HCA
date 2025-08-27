/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
  LinkField,
  RichText as JssRichText,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import CardBlockCarousel from '@component-library/careers/CardBlockCarousel/CardBlockCarousel';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import getHeadingTags from 'lib/getHeadingTags';

type CTAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
    SvgMarkup48?: Field<string>;
  };
};

interface CardFields {
  fields: {
    Title?: Field<string>;
    Text?: Field<string>;
    Icon?: CTAIconFields;
    Image?: ImageField;
    PrimaryCTA: LinkField;
    SecondaryCTA: LinkField;
  };
}

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Cards?: CardFields[];
}

type ContentCarouselExtendedProps = {
  params?: Params;
  fields?: Fields;
};

const ContentCarouselExtendedDefaultComponent = (
  props: ContentCarouselExtendedProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Content Carousel Extended. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: ContentCarouselExtendedProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <ContentCarouselExtendedDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const cards =
    props.fields?.Cards?.map((card) => {
      const iconMarkup = card?.fields?.Icon?.fields?.SvgMarkup48?.value || '';
      const hasTitle = card?.fields?.Title || isExperienceEditor;
      const hasText = card?.fields?.Text || isExperienceEditor;

      return {
        image: (
          <NextJssImage
            field={card?.fields?.Image}
            editable={false}
            next={{
              width: 456,
              height: 253,
              sizes: '(max-width: 768px) 100vw, 30vw',
            }}
          />
        ),
        icon: card?.fields?.Icon ? (
          <span dangerouslySetInnerHTML={{ __html: iconMarkup }} />
        ) : undefined,
        title: hasTitle ? (
          <Text variation="heading-2">
            <JssText field={card.fields?.Title} />
          </Text>
        ) : undefined,
        bodyText: hasText ? (
          <Text variation="body-medium">
            <JssRichText tag="div" field={card.fields?.Text} />
          </Text>
        ) : undefined,
      };
    }) || [];

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );

  return (
    <CardBlockCarousel
      title={
        <>
          <Text
            variation={props.params?.HeadingSize || 'display-2'}
            tag={headingTag}
          >
            <JssText field={props.fields?.Title} />
          </Text>
        </>
      }
      subtitle={
        !isExperienceEditor ? (
          props.fields?.Heading?.value ? (
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText field={props.fields?.Heading} />
            </Text>
          ) : (
            <></>
          )
        ) : (
          <Text tag="span" variation={'subheading-1'}>
            <JssText field={props.fields?.Heading} />
          </Text>
        )
      }
      bodyText={
        (props.fields?.Text?.value || isExperienceEditor) && (
          <Text tag="div" variation="body-medium">
            <JssRichText tag="div" field={props.fields?.Text} />
          </Text>
        )
      }
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      cards={cards}
    ></CardBlockCarousel>
  );
};
