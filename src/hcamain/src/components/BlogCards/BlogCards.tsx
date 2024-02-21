import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  Image as JssImage,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlogBlock from '@component-library/site-components/CardBlogBlock/CardBlogBlock';
import Text from '@component-library/foundation/Text/Text';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import { HeadingSize, HeadingTag, Theme } from 'src/types/params';
import Tags from '@component-library/core-components/Tags/Tags';
import Button from '@component-library/core-components/Button/Button';
import JssDate from '../../jss-abstractions/JssDate/JssDate';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ArticleTypeFields = Item & {
  fields?: {
    Title?: Field<string>;
  };
};

type BlogFields = Item & {
  fields?: {
    Title?: Field<string>;
    Description?: Field<string>;
    Date?: Field<string>;
    Image?: ImageField;
    ArticleType?: ArticleTypeFields;
  };
  url?: string;
};

interface Fields {
  Title?: Field<string>;
  CTAIcon?: HCAIconFields;
  CTALink?: LinkField;
  Cards?: BlogFields[];
}

type BlogCardsProps = {
  params: {
    Theme: Theme;
    HeadingSize: HeadingSize;
    styles: string;
    HeadingTag: HeadingTag;
  };
  fields?: Fields;
};

const BlogCardsDefaultComponent = (props: BlogCardsProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Carousel = (props: BlogCardsProps): JSX.Element => {
  if (!props.fields) {
    return <BlogCardsDefaultComponent {...props} />;
  }

  return (
    <CarouselCards
      title={
        <Text
          tag={props.params.HeadingTag || 'h2'}
          variation={props.params.HeadingSize}
        >
          <JssText field={props.fields.Title} />
        </Text>
      }
      link={
        props.fields?.CTALink && (
          <Button size={'large'} theme={'full'}>
            <JssLink field={props.fields?.CTALink}>
              {props?.fields?.CTALink.value.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.fields.CTALink.value.text,
                  }}
                ></span>
              )}
            </JssLink>
          </Button>
        )
      }
      theme={props.params.Theme}
    >
      {props.fields.Cards?.map((card) => {
        return (
          <CardBlog key={card.id}>
            <JssImage field={card.fields.Image} />
            <JssDate field={card.fields?.Date} />
            <Text tag={'h3'} variation={'heading-2'}>
              <a href={card.url}>
                <JssText field={card.fields.Title} />
              </a>
            </Text>
            <Text tag={'p'} variation={'body-large'}>
              <JssRichText tag="span" field={card.fields.Description} />
            </Text>
            {!!card.fields.ArticleType && (
              <Tags>
                <JssText
                  key={card.fields.ArticleType?.id}
                  tag="p"
                  field={card.fields.ArticleType?.fields.Title}
                />
              </Tags>
            )}
          </CardBlog>
        );
      })}
    </CarouselCards>
  );
};

export const Standard = (props: BlogCardsProps): JSX.Element => {
  if (!props.fields) {
    return <BlogCardsDefaultComponent {...props} />;
  }
  return (
    <>
      <CardBlogBlock
        title={
          <Text tag={'h2'} variation={'display-5'}>
            <JssText field={props.fields.Title} />
          </Text>
        }
        cta={
          props.fields?.CTALink && (
            <Button size={'large'} theme={'full'}>
              <JssLink field={props.fields?.CTALink}>
                {props?.fields?.CTALink.value.text && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: props.fields.CTALink.value.text,
                    }}
                  ></span>
                )}
              </JssLink>
            </Button>
          )
        }
        theme={props.params.Theme}
      >
        {props.fields.Cards?.map((card, index) => {
          const isFeature = index % 10 === 0 || index % 10 === 7; // scaling logic to accommodate more than 5 cards
          return (
            <CardBlog
              key={card.id}
              variation={isFeature ? 'feature' : 'default'}
            >
              {isFeature && <JssImage field={card.fields.Image} />}
              <JssDate field={card.fields?.Date} />
              <Text
                tag={'h3'}
                variation={isFeature ? 'display-5' : 'heading-2'}
              >
                <a href={card.url}>
                  <JssText field={card.fields.Title} />
                </a>
              </Text>
              {isFeature && (
                <Text tag={'p'} variation={'body-large'}>
                  <JssRichText tag="span" field={card.fields.Description} />
                </Text>
              )}
              {card.fields.ArticleType && (
                <Tags>
                    <JssText key={card.fields.ArticleType.id} tag="p" field={card.fields.ArticleType.fields.Title} />
                </Tags>
              )}
            </CardBlog>
          );
        })}
      </CardBlogBlock>
    </>
  );
};
