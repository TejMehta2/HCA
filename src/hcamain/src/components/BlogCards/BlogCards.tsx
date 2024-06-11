import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  Item,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlogBlock from '@component-library/site-components/CardBlogBlock/CardBlogBlock';
import Text from '@component-library/foundation/Text/Text';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Params from 'src/types/params';
import Tags from '@component-library/core-components/Tags/Tags';
import Button from '@component-library/core-components/Button/Button';
import JssDate from '../../jss-abstractions/JssDate/JssDate';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DynamicCarouselCards = dynamic(
  () =>
    import('@component-library/site-components/CarouselCards/CarouselCards'),
  {
    ssr: false,
  }
);

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ArticleTypeFields = Item & {
  fields?: {
    id?: string;
    Title?: Field<string>;
  };
};

type BlogFields = Item & {
  fields?: {
    AbstractTitle?: Field<string>;
    AbstractText?: Field<string>;
    AbstractImage?: ImageField;
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
  CTALink: LinkField;
  Cards?: BlogFields[];
  BlogUrl?: LinkField;
}

type BlogCardsProps = {
  params?: Params;
  fields?: Fields;
};

const BlogCardsDefaultComponent = (props: BlogCardsProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Carousel = (props: BlogCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <BlogCardsDefaultComponent {...props} />;
  }

  return (
    <DynamicCarouselCards
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
      link={
        isExperienceEditor ? (
          <JssLink field={props.fields?.CTALink}></JssLink>
        ) : props.fields.BlogUrl?.value.href && props.fields?.CTALink ? (
          <Button size={'large'} variation={'full'}>
            <JssLink
              href={props.fields.BlogUrl?.value.href}
              field={props.fields?.CTALink}
            >
              {props?.fields?.CTALink.value.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.fields?.CTALink.value.text,
                  }}
                ></span>
              )}
            </JssLink>
          </Button>
        ) : (
          <></>
        )
      }
      theme={props.params?.Theme || 'A-HCA-White'}
    >
      {props.fields?.Cards?.map((card) => {
        return (
          <CardBlog key={card.id}>
            {card.fields?.AbstractImage?.value?.src &&
            card.fields?.AbstractImage?.value?.class !== 'scEmptyImage' ? (
              <Image
                src={card.fields.AbstractImage?.value?.src || ''}
                alt={(card.fields.AbstractImage?.value?.alt as string) || ''}
                width="409"
                height="268"
              />
            ) : (
              <Image
                src={card.fields.Image?.value?.src || ''}
                alt={(card.fields.Image?.value?.alt as string) || ''}
                width="409"
                height="268"
              />
            )}
            <JssDate field={card.fields?.Date} editable={false} />
            <Text tag={'h3'} variation={'heading-2'}>
              <a href={card.url}>
                {card.fields?.AbstractTitle?.value ? (
                  <JssText field={card.fields?.AbstractTitle} />
                ) : (
                  <JssText field={card.fields?.Title} />
                )}
              </a>
            </Text>
            <Text tag={'p'} variation={'body-large'}>
              {card.fields?.AbstractText?.value ? (
                <JssRichText tag="span" field={card.fields.AbstractText} />
              ) : (
                <JssRichText tag="span" field={card.fields.Description} />
              )}
            </Text>
            <div>
              {!!card.fields?.ArticleType?.fields.id && (
                <Tags>
                  <a
                    href={`${props.fields?.BlogUrl?.value.href}${props.fields?.BlogUrl?.value.querystring}${card.fields.ArticleType?.id}`}
                  >
                    {card.fields?.ArticleType.fields.id}
                  </a>
                </Tags>
              )}
            </div>
          </CardBlog>
        );
      })}
    </DynamicCarouselCards>
  );
};

export const Standard = (props: BlogCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <BlogCardsDefaultComponent {...props} />;
  }

  return (
    <>
      <CardBlogBlock
        title={
          <Text
            tag={props.params?.HeadingTag || 'h2'}
            variation={props.params?.HeadingSize || 'display-5'}
          >
            <JssText field={props.fields?.Title} />
          </Text>
        }
        cta={
          isExperienceEditor ? (
            <JssLink field={props.fields?.CTALink}></JssLink>
          ) : props.fields.BlogUrl?.value.href &&
            props.fields?.CTALink?.value.text ? (
            <Button size={'large'} variation={'full'}>
              <JssLink
                href={props.fields.BlogUrl?.value.href}
                field={props.fields?.CTALink}
              >
                {props?.fields?.CTALink.value.text && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: props.fields?.CTALink.value.text,
                    }}
                  ></span>
                )}
              </JssLink>
            </Button>
          ) : (
            <></>
          )
        }
        theme={props.params?.Theme || 'A-HCA-White'}
      >
        {props.fields?.Cards?.map((card, index) => {
          const isFeature = index % 10 === 0 || index % 10 === 7; // scaling logic to accommodate more than 5 cards
          return (
            <CardBlog
              key={card.id}
              variation={isFeature ? 'feature' : 'default'}
            >
              {isFeature &&
              card.fields?.AbstractImage?.value?.src &&
              card.fields?.AbstractImage?.value?.class !== 'scEmptyImage' ? (
                <Image
                  src={card.fields.AbstractImage?.value?.src || ''}
                  alt={(card.fields.AbstractImage?.value?.alt as string) || ''}
                  width="644"
                  height="268"
                />
              ) : (
                isFeature && (
                  <Image
                    src={card.fields.Image?.value?.src || ''}
                    alt={(card.fields.Image?.value?.alt as string) || ''}
                    width="644"
                    height="268"
                  />
                )
              )}
              <JssDate field={card.fields?.Date} editable={false} />
              <Text
                tag={'h3'}
                variation={isFeature ? 'display-5' : 'heading-2'}
              >
                <a href={card.url}>
                  {card.fields?.AbstractTitle?.value ? (
                    <JssText field={card.fields?.AbstractTitle} />
                  ) : (
                    <JssText field={card.fields?.Title} />
                  )}
                </a>
              </Text>
              {isFeature && (
                <Text tag={'p'} variation={'body-large'}>
                  {card.fields?.AbstractText?.value ? (
                    <JssRichText tag="span" field={card.fields.AbstractText} />
                  ) : (
                    <JssRichText tag="span" field={card.fields.Description} />
                  )}
                </Text>
              )}
              <div>
                {card.fields.ArticleType && (
                  <Tags>
                    <a
                      href={`${props.fields?.BlogUrl?.value.href}${props.fields?.BlogUrl?.value.querystring}${card.fields.ArticleType?.id}`}
                    >
                      {card.fields?.ArticleType.fields.Title?.value}
                    </a>
                  </Tags>
                )}
              </div>
            </CardBlog>
          );
        })}
      </CardBlogBlock>
    </>
  );
};
