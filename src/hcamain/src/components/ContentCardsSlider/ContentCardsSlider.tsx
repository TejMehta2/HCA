import React from 'react';
import {
  Image as JssImage,
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
}

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
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

  const link =
    props.fields?.data?.item?.cTALink?.jsonValue &&
    (!isExperienceEditor ? (
      <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
        <RichText
          tag="span"
          field={{
            value: props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
          }}
        />
      </JssLink>
    ) : (
      <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue} />
    ));

  return (
    <CarouselCards
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-4'}
        >
          {props.fields?.data?.item?.title?.jsonValue?.value}
        </Text>
      }
      subtitle={
        props.fields?.data?.item?.heading?.jsonValue?.value ? (
          <Text tag="span" variation={'subheading-1'}>
            <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
          </Text>
        ) : (
          <></>
        )
      }
      link={link}
    >
      {props.fields?.data?.item?.pages?.PagesList?.map((cards, index) => (
        <CardContent
          key={index}
          image={
            showImage ? (
              cards.abstractImage?.jsonValue.value?.src ? (
                <JssImage
                  field={cards.abstractImage.jsonValue}
                  editable={false}
                />
              ) : (
                <JssImage field={cards.image?.jsonValue} editable={false} />
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
            <a href={cards?.url?.path}>
              <RichText
                tag="span"
                field={{
                  value:
                    props.fields?.data?.item?.cTACardText?.jsonValue?.value,
                }}
              />
            </a>
          }
        />
      ))}
    </CarouselCards>
  );
};
export const WithoutImage = (props: ContentCardsSliderProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ContentCardsSliderDefaultComponent {...props} />;
  }
  return <WithImage {...props} showImage={false} />;
};
