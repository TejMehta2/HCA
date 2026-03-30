/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
  RichText as JssRichText,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import getHeadingTags from 'lib/getHeadingTags';
import { AuthorFields } from 'src/types/authorFields';
import CarouselTestimonials from '@component-library/careers/CarouselTestimonials/CarouselTestimonials';

interface CardFields {
  fields: {
    Quote?: Field<string>;
    Author?: AuthorFields[];
    Image?: ImageField;
  };
}

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Cards?: CardFields[];
}

type TestimonialsProps = {
  params?: Params;
  fields?: Fields;
};

const TestimonialsDefaultComponent = (
  props: TestimonialsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Testimonials. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TestimonialsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <TestimonialsDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const cards =
    props.fields?.Cards?.map((card) => {
      const hasText = card?.fields?.Quote || isExperienceEditor;
      const author = card?.fields?.Author?.[0];

      return {
        image: (
          <NextJssImage
            field={card?.fields?.Image}
            editable={false}
            next={{
              width: 1200,
              height: 1200,
              sizes: '(max-width: 1200px) 100vw, 30vw',
              quality: 90
            }}
          />
        ),
        thumbnail: (
          <NextJssImage
            field={card?.fields?.Image}
            editable={false}
            next={{
              width: 80,
              height: 80,
              sizes: '(max-width: 768px) 100vw, 30vw',
            }}
          />
        ),
        name: (
          <Text tag="p" variation="body-bold-extra-large">
            <JssText field={author?.fields?.Name} />
          </Text>
        ),
        role: (
          <Text tag="p" variation="body-medium">
            <JssText field={author?.fields?.Position} />
          </Text>
        ),
        body: hasText ? (
          <Text variation="body-large">
            <JssRichText tag="div" field={card.fields?.Quote} />
          </Text>
        ) : undefined,
      };
    }) || [];

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );

  return (
    <CarouselTestimonials
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      subtitle={
        isExperienceEditor || props.fields?.Heading?.value ? (
          <Text tag={subheadingTag} variation={'subheading-1'}>
            <JssText field={props.fields?.Heading} />
          </Text>
        ) : (
          <></>
        )
      }
      title={
        <Text
          variation={props.params?.HeadingSize || 'display-1'}
          tag={headingTag}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
      slides={cards}
    />
  );
};
