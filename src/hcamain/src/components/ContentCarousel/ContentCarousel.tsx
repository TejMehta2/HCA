import React, { useEffect } from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselContent from '@component-library/site-components/CarouselContent/CarouselContent';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import RichText from '@component-library/core-components/RichText/RichText';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { useInPageNavigationContext } from 'src/context/InPageNavigationContext';

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
  const { addComponent } = useInPageNavigationContext();

  const tableOfContentsLinkTitle = props.params?.TableOfContentsLinkTitle;
  const hideEmptyComponent = !props.fields?.Cards?.length;
  const includeInTableOfContents =
    !props.params?.ExcludeFromTableOfContents && !hideEmptyComponent;

  const componentAnchorId = generateHtmlSafeId(tableOfContentsLinkTitle);

  useEffect(() => {
    if (includeInTableOfContents && tableOfContentsLinkTitle) {
      addComponent({
        Id: componentAnchorId,
        TableOfContentsLinkTitle: tableOfContentsLinkTitle,
      });
    }
  }, [includeInTableOfContents]);

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
        id={componentAnchorId}
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
              <Text tag="div" variation="body-large">
                <RichText>
                  <JssRichText tag={'span'} field={cards?.fields?.Text} />
                </RichText>
              </Text>
            ),
            image: (
              <NextJssImage
                field={cards?.fields?.Image}
                editable={false}
                next={{
                  width: 500,
                  height: 400,
                  sizes: '(max-width: 768px) 100vw, 30vw',
                }}
              />
            ),
          })) || []
        }
      />
    </>
  );
};
