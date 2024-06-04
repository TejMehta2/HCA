import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselContent from '@component-library/site-components/CarouselContent/CarouselContent';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';

interface CardFields {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    Image?: ImageField;
  };
}

interface Fields {
  Cards?: CardFields[];
}

type ContentCarouselProps = {
  params?: Params;
  fields?: Fields;
};

const ContentCarouselDefaultComponent = (
  props: ContentCarouselProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <h1>ContentCarouselDefaultComponent</h1>
  </div>
);

export const Default = (props: ContentCarouselProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <ContentCarouselDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  return (
    <>
      <CarouselContent
        theme={props.params?.Theme || 'A-HCA-White'}
        slides={
          props.fields?.Cards?.map((cards) => ({
            title: (
              <Text
                tag={props.params?.HeadingTag}
                variation={props.params?.HeadingSize}
              >
                <JssText tag={'span'} field={cards?.fields?.Title} />
              </Text>
            ),
            body: (
              <Text tag="p" variation="body-large">
                <JssRichText tag={'span'} field={cards?.fields?.Text} />
              </Text>
            ),
            image: <JssImage field={cards?.fields?.Image} />,
          })) || []
        }
      />
    </>
  );
};
