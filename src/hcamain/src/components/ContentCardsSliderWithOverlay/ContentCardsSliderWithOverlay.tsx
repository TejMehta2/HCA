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

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

interface PagesFields {
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

interface WithImageProps extends ContentCardsSliderWithOverlayProps {
  showImage: boolean;
}

export const Default = (props: WithImageProps): JSX.Element => {
  const { showImage = true } = props;
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

  return (
    <CarouselCards
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-4'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      subtitle={
        !isExperienceEditor ? (
          props.fields?.data?.item?.heading?.jsonValue?.value ? (
            <Text tag="span" variation={'subheading-1'}>
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
        const cardCtaUrl = '#overlay';

        return (
          <CardContent
            key={index}
            image={
              showImage ? (
                <NextJssImage
                  field={cards.image?.jsonValue}
                  editable={false}
                  next={{
                    width: 500,
                    height: 400,
                    sizes: '(max-width: 768px) 100vw, 30vw',
                  }}
                />
              ) : undefined
            }
            title={
              <Text
                tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                variation="heading-1"
              >
                <JssText field={cards.title} />
              </Text>
            }
            bodyCopy={
              cards?.text ? (
                <Text tag="p" variation="body-large">
                  <RichText tag="span" field={cards.text} />
                  <p>
                    OverlayTitle:
                    <JssText tag={'span'} field={cards?.overlayTitle} />
                  </p>
                  <p>
                    OverlayHeading:
                    <JssText tag={'span'} field={cards?.overlayHeading} />
                  </p>
                  <div>
                    OverlayText:
                    <RichText tag={'div'} field={cards?.overlayText} />
                  </div>
                  <p>
                    OverlayImage:{cards?.overlayImage?.jsonValue?.value?.src}
                  </p>
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
export const WithoutImage = (
  props: ContentCardsSliderWithOverlayProps
): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ContentCardsSliderWithOverlayDefaultComponent {...props} />;
  }
  return <Default {...props} showImage={false} />;
};
