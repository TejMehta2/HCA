/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text as JssText,
  Field,
  Link as JssLink,
  LinkField,
  ImageField,
  RichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
  proxyurl?: { path?: string };
}

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      cTACardText?: { jsonValue?: Field<string> };
      pages?: {
        PagesList?: PagesFields[];
      };
    };
  };
}

type ContentCardsSliderProps = {
  params?: Params;
  fields?: Fields;
};

const ContentCardsSliderDefaultComponent = (
  props: ContentCardsSliderProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <h1>ContentCardsSliderDefaultComponent</h1>
  </div>
);

interface WithImageProps extends ContentCardsSliderProps {
  showImage: boolean;
}

export const WithImage = (props: WithImageProps): JSX.Element => {
  const { showImage = true } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields?.data?.item) {
    return <ContentCardsSliderDefaultComponent {...props} />;
  }

  if (
    !props.fields?.data?.item?.pages?.PagesList?.length &&
    !isExperienceEditor
  ) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const link = isExperienceEditor ? (
    <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue} />
  ) : (
    props.fields?.data?.item?.cTALink?.jsonValue.value.href && (
      <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
        <SitecoreSvg>
          {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
        </SitecoreSvg>
        <RichText
          tag="span"
          field={{
            value: props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
          }}
        />
      </JssLink>
    )
  );

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );
  return (
    <CarouselCards
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={headingTag}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      subtitle={
        !isExperienceEditor ? (
          props.fields?.data?.item?.heading?.jsonValue?.value ? (
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
            </Text>
          ) : (
            <></>
          )
        ) : (
          <Text tag="span" variation={'subheading-1'}>
            <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
          </Text>
        )
      }
      bodyCopy={
        <Text variation={'body-large'} tag="div">
          <RichText field={props.fields?.data?.item?.text?.jsonValue} />
        </Text>
      }
      link={link || <></>}
    >
      {props.fields?.data?.item?.pages?.PagesList?.map((cards, index) => {
        const cardCtaUrl = cards?.proxyurl?.path
          ? cards?.proxyurl?.path
          : cards?.url?.path;

        return (
          <CardContent
            key={index}
            image={
              showImage ? (
                cards.abstractImage?.jsonValue.value?.src &&
                cards.abstractImage?.jsonValue.value?.class !==
                  'scEmptyImage' ? (
                  <NextJssImage
                    field={cards.abstractImage.jsonValue}
                    editable={false}
                    next={{
                      width: 500,
                      height: 400,
                      sizes: '(max-width: 768px) 100vw, 30vw',
                    }}
                  />
                ) : (
                  <NextJssImage
                    field={cards.image?.jsonValue}
                    editable={false}
                    next={{
                      width: 500,
                      height: 400,
                      sizes: '(max-width: 768px) 100vw, 30vw',
                    }}
                  />
                )
              ) : undefined
            }
            title={
              <Text
                tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                variation="heading-1"
              >
                {cards.abstractTitle?.value ? (
                  <JssText field={cards.abstractTitle} />
                ) : (
                  <JssText field={cards.title} />
                )}
              </Text>
            }
            bodyCopy={
              cards?.text ? (
                <Text tag="p" variation="body-large">
                  {cards.abstractText?.value ? (
                    <RichText tag="span" field={cards.abstractText} />
                  ) : (
                    <RichText tag="span" field={cards.text} />
                  )}
                </Text>
              ) : undefined
            }
            link={
              cardCtaUrl ? (
                <a href={cardCtaUrl}>
                  <RichText
                    tag="div"
                    field={props.fields?.data?.item?.cTACardText?.jsonValue}
                  />
                </a>
              ) : (
                <></>
              )
            }
          />
        );
      })}
    </CarouselCards>
  );
};
export const WithoutImage = (props: ContentCardsSliderProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ContentCardsSliderDefaultComponent {...props} />;
  }
  return <WithImage {...props} showImage={false} />;
};
