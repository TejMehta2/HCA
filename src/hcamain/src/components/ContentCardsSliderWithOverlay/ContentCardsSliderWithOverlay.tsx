/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text as JssText,
  Field,
  Link as JssLink,
  LinkField,
  ImageField,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CardWithModal from './CardWithModal';
import Params from 'src/types/params';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

export interface PagesFields {
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  overlayHeading?: { value?: string };
  overlayTitle?: { value?: string };
  overlayText?: { value?: string };
  overlayImage?: { jsonValue: ImageField };
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

type ContentCardsSliderWithOverlayProps = {
  params?: Params;
  fields?: Fields;
};

const ContentCardsSliderWithOverlayDefaultComponent = (
  props: ContentCardsSliderWithOverlayProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Content Cards Slider With Overlay. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export interface WithImageProps extends ContentCardsSliderWithOverlayProps {
  showImage: boolean;
}

export const Default = (props: WithImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields?.data?.item) {
    return <ContentCardsSliderWithOverlayDefaultComponent {...props} />;
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
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const link = isExperienceEditor ? (
    <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue} />
  ) : (
    props.fields?.data?.item?.cTALink?.jsonValue.value.href && (
      <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
        <SitecoreSvg>
          {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
        </SitecoreSvg>
        <JssRichText
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
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
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
          <JssRichText field={props.fields?.data?.item?.text?.jsonValue} />
        </Text>
      }
      link={link || <></>}
    >
      {props.fields?.data?.item?.pages?.PagesList?.map((cards, index) => {
        return <CardWithModal {...props} cards={cards} key={index} />;
      })}
    </CarouselCards>
  );
};

export const WithoutImage = (
  props: ContentCardsSliderWithOverlayProps
): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ContentCardsSliderWithOverlayDefaultComponent {...props} />;
  }
  return <Default {...props} showImage={false} />;
};
