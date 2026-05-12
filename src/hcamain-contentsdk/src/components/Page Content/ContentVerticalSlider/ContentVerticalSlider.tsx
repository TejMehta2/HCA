/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
  LinkField,
  RichText as JssRichText,
  ImageField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

import dynamic from 'next/dynamic';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import getHeadingTags from 'lib/getHeadingTags';

import RichText from '@component-library/core-components/RichText/RichText';
import CardRole from '@component-library/careers/CardRole/CardRole';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';

const DynamicServiceCards = dynamic(
  () => import('@component-library/site-components/ServiceCards/ServiceCards'),
  {
    ssr: true,
  }
);

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

type ContentVerticalSliderProps = {
  params?: Params;
  fields?: Fields;
};

const ContentVerticalSliderDefaultComponent = (
  props: ContentVerticalSliderProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Content Vertical Slider. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: ContentVerticalSliderProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <ContentVerticalSliderDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );

  return (
    <DynamicServiceCards
      theme={props.params?.Theme || 'I-HCA-Goldenrod'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      contentVariation={'role'}
      title={
        (props.fields?.Title || isExperienceEditor) && (
          <Text
            tag={headingTag}
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText field={props.fields?.Title} />
          </Text>
        )
      }
      subtitle={
        (props.fields?.Heading || isExperienceEditor) && (
          <Text tag={subheadingTag} variation="subheading-1">
            <JssText field={props.fields?.Heading} />
          </Text>
        )
      }
      bodyText={
        <RichText>
          <JssRichText field={props.fields?.Text} />
        </RichText>
      }
      cta={null}
    >
      {props.fields?.Cards?.map((card, index) => {
        const iconMarkup = card?.fields?.Icon?.fields?.SvgMarkup48?.value || '';
        const hasTitle = card?.fields?.Title || isExperienceEditor;

        return (
          <CardRole
            title={
              hasTitle ? (
                <Text tag="div" variation="heading-2">
                  <JssText field={card.fields?.Title} />
                </Text>
              ) : undefined
            }
            icon={
              card?.fields?.Icon ? (
                <span dangerouslySetInnerHTML={{ __html: iconMarkup }} />
              ) : undefined
            }
            cta={
              (isExperienceEditor || card.fields.PrimaryCTA) && (
                <Button size="small" variation="full">
                  <JssLink field={card.fields.PrimaryCTA}>
                    <span>
                      <Icons iconName="iconArrowSmallRight" />
                    </span>
                  </JssLink>
                </Button>
              )
            }
            key={index}
            image={
              <NextJssImage
                field={card?.fields?.Image}
                editable={false}
                next={{
                  width: 313,
                  height: 317,
                  sizes: '(max-width: 768px) 100vw, 30vw',
                }}
              />
            }
          />
        );
      })}
    </DynamicServiceCards>
  );
};
