'use client';
import { type JSX } from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  LinkFieldValue,
} from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Params from 'src/types/params';
import Tags from '@component-library/core-components/Tags/Tags';
import Button from '@component-library/core-components/Button/Button';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import Image from 'next/image';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import dynamic from 'next/dynamic';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import { ComponentWithContextProps } from 'lib/component-props';

const DynamicCardBlogBlock = dynamic(
  () =>
    import('@component-library/site-components/CardBlogBlock/CardBlogBlock'),
  {
    ssr: true,
  }
);

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type ArticleTypeFields = {
  id?: string;
  title?: { value?: string };
};

type BlogFields = {
  id?: string;
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  date?: { jsonValue?: Field<string> };
  image?: { jsonValue?: ImageField };
  url?: { path?: string };
  articleType?: { targetItem?: ArticleTypeFields };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        targetItem?: CTAIconFields;
      };
      cTALink: { jsonValue: { value: LinkFieldValue } };
      blogUrl: { jsonValue: { value: LinkFieldValue } };
      cards?: {
        targetItems?: BlogFields[];
      };
    };
  };
}

type BlogCardsProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

const BlogCardsDefaultComponent = (props: BlogCardsProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Blog Cards. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Carousel = (props: BlogCardsProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (!props.fields?.data?.item) {
    return <BlogCardsDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

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
      link={
        isExperienceEditor ? (
          <JssLink
            field={props.fields?.data?.item?.cTALink?.jsonValue}
          ></JssLink>
        ) : props.fields?.data?.item?.cTALink ? (
          <Button size={'large'} variation={'full'}>
            <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
              {props.fields?.data?.item?.cTALink.jsonValue.value.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTALink.jsonValue.value.text,
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
      {props.fields?.data?.item?.cards?.targetItems?.map((card) => {
        return (
          <CardBlog key={card.id}>
            {card.abstractImage?.jsonValue.value?.src &&
            card.abstractImage?.jsonValue.value?.class !== 'scEmptyImage' ? (
              <Image
                src={card.abstractImage?.jsonValue?.value?.src || ''}
                alt={
                  (card.abstractImage?.jsonValue?.value?.alt as string) || ''
                }
                width="409"
                height="268"
              />
            ) : (
              <Image
                src={card.image?.jsonValue?.value?.src || ''}
                alt={(card.image?.jsonValue?.value?.alt as string) || ''}
                width="409"
                height="268"
              />
            )}
            <JssDate field={card.date?.jsonValue} editable={false} />
            <Text tag={'h3'} variation={'heading-2'}>
              <a href={card.url?.path}>
                {card.abstractTitle?.value ? (
                  <JssText field={card.abstractTitle} />
                ) : (
                  <JssText field={card.title} />
                )}
              </a>
            </Text>
            <Text tag={'p'} variation={'body-large'}>
              {card.abstractText?.value ? (
                <JssRichText tag="span" field={card.abstractText} />
              ) : (
                <JssRichText tag="span" field={card.text} />
              )}
            </Text>
            <div>
              {card.articleType?.targetItem?.id && (
                <Tags>
                  {props.fields?.data?.item?.blogUrl?.jsonValue.value.href ? (
                    <a
                      href={`${props.fields?.data?.item?.blogUrl?.jsonValue.value.href}${props.fields?.data?.item?.blogUrl?.jsonValue?.value.querystring}${card.articleType?.targetItem.id}`}
                    >
                      {card.articleType.targetItem.title?.value}
                    </a>
                  ) : (
                    <span>{card.articleType.targetItem.title?.value}</span>
                  )}
                </Tags>
              )}
            </div>
          </CardBlog>
        );
      })}
    </CarouselCards>
  );
};

export const Standard = (props: BlogCardsProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  if (!props.fields?.data?.item) {
    return <BlogCardsDefaultComponent {...props} />;
  }

  const componentTitle = props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    componentTitle
  );

  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || componentTitle;

  return (
    <>
      <DynamicCardBlogBlock
        id={componentAnchorId}
        {...(tableOfContentTitle &&
        props?.params?.ExcludeFromTableOfContents !== '1'
          ? { tableOfContentTitle: tableOfContentTitle }
          : {})}
        title={
          <Text
            tag={props.params?.HeadingTag || 'h2'}
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText field={props.fields?.data?.item?.title?.jsonValue} />
          </Text>
        }
        cta={
          isExperienceEditor ? (
            <JssLink
              field={props.fields?.data?.item?.cTALink.jsonValue}
            ></JssLink>
          ) : props.fields?.data?.item?.cTALink?.jsonValue?.value.href &&
            props.fields?.data?.item.cTALink?.jsonValue?.value.text ? (
            <Button size={'large'} variation={'full'}>
              <JssLink field={props.fields?.data?.item.cTALink?.jsonValue}>
                {props.fields?.data?.item.cTALink?.jsonValue?.value.text && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props.fields?.data?.item.cTALink?.jsonValue?.value.text,
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
        {props.fields?.data?.item.cards?.targetItems?.map((card, index) => {
          const isFeature = index % 10 === 0 || index % 10 === 7; // scaling logic to accommodate more than 5 cards

          return (
            <CardBlog
              key={card.id}
              variation={isFeature ? 'feature' : 'default'}
            >
              {isFeature &&
              card.abstractImage?.jsonValue?.value?.src &&
              card.abstractImage?.jsonValue?.value?.class !== 'scEmptyImage' ? (
                <Image
                  src={card.abstractImage?.jsonValue?.value?.src || ''}
                  alt={
                    (card.abstractImage?.jsonValue?.value?.alt as string) || ''
                  }
                  width="644"
                  height="268"
                />
              ) : (
                isFeature &&
                card.image?.jsonValue?.value?.src && (
                  <Image
                    src={card.image?.jsonValue?.value?.src || ''}
                    alt={(card.image?.jsonValue?.value?.alt as string) || ''}
                    width="644"
                    height="268"
                  />
                )
              )}
              <JssDate field={card.date?.jsonValue} editable={false} />
              <Text
                tag={'h3'}
                variation={isFeature ? 'display-5' : 'heading-2'}
              >
                <a href={card.url?.path}>
                  {card.abstractTitle?.value ? (
                    <JssText field={card.abstractTitle} />
                  ) : (
                    <JssText field={card.title} />
                  )}
                </a>
              </Text>
              {isFeature && (
                <Text tag={'p'} variation={'body-large'}>
                  {card.abstractText?.value ? (
                    <JssRichText tag="span" field={card.abstractText} />
                  ) : (
                    <JssRichText tag="span" field={card.text} />
                  )}
                </Text>
              )}
              <div>
                {card.articleType?.targetItem && (
                  <Tags>
                    {props.fields?.data?.item?.blogUrl?.jsonValue.value.href ? (
                      <a
                        href={`${props.fields?.data?.item?.blogUrl?.jsonValue.value.href}${props.fields?.data?.item?.blogUrl?.jsonValue?.value.querystring}${card.articleType?.targetItem.id}`}
                      >
                        {card.articleType.targetItem.title?.value}
                      </a>
                    ) : (
                      <span>{card.articleType.targetItem.title?.value}</span>
                    )}
                  </Tags>
                )}
              </div>
            </CardBlog>
          );
        })}
      </DynamicCardBlogBlock>
    </>
  );
};

export const Default = Carousel;
