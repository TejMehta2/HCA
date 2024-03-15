import React from 'react';
import {
  Field,
  LinkField,
  Item,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Tags from '@component-library/core-components/Tags/Tags';
import JssDate from '../../jss-abstractions/JssDate/JssDate';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type SortOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValue?: { jsonValue?: Item };
};

type BlogPageFields = {
  title?: { jsonValue?: Field<string> };
  text?: { jsonValue?: Field<string> };
  date?: { jsonValue?: Field<string> };
  articleType?: { targetItem?: ArticleTypeFields };
};

type ArticleTypeFields = {
  title?: { value?: string };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      articles?: {
        ArticlesList?: BlogPageFields[];
      };
      searchBy?: {
        SearchByList?: SortOptionsFields[];
      };
      filterOptions?: {
        FilterByList?: SortOptionsFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      blogUrl?: { jsonValue?: LinkField };
    };
    contextItem?: {
      categoryId?: { jsonValue?: Field<string> };
    };
  };
}

type BlogRelatedArticlesProps = {
  params: Params;
  fields: Fields;
};

const BlogRelatedArticlesDefaultComponent = (
  props: BlogRelatedArticlesProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogRelatedArticles no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogRelatedArticlesProps): JSX.Element => {
  if (!props.fields) {
    return <BlogRelatedArticlesDefaultComponent {...props} />;
  }
  console.log(props);

  return (
    <CarouselCards
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          <JssText field={props?.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      link={
        props.fields?.data?.item?.blogUrl?.jsonValue?.value && (
          <Button size={'large'} variation={'full'}>
            <JssLink
              field={props.fields?.data?.item?.blogUrl?.jsonValue?.value}
            >
              {props.fields?.data?.item?.blogUrl?.jsonValue?.value?.href && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.blogUrl?.jsonValue?.value?.href,
                  }}
                ></span>
              )}
            </JssLink>
          </Button>
        )
      }
      theme={props.params?.Theme || 'A-HCA-White'}
    >
      {props.fields?.data?.item?.articles?.ArticlesList?.map((card, index) => {
        return (
          <CardBlog key={index}>
            {/* <JssImage field={card.fields.Image} /> */}
            <JssDate field={card.date?.jsonValue} />
            <Text tag={'h3'} variation={'heading-2'}>
              <a href="#">
                <JssText field={card.title?.jsonValue} />
              </a>
            </Text>
            <Text tag={'p'} variation={'body-large'}>
              <JssRichText tag="span" field={card.text?.jsonValue} />
            </Text>
            {!!card.articleType && (
              <Tags>
                <a href="#">
                  <JssText field={card.articleType?.targetItem?.title} />
                </a>
              </Tags>
            )}
          </CardBlog>
        );
      })}
    </CarouselCards>
  );

  /* return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props?.fields?.data?.item?.heading?.jsonValue} />
      <br />
      <JssText field={props?.fields?.data?.item?.title?.jsonValue} />
      <br />
      <RichText tag="span" field={props?.fields?.data?.item?.text?.jsonValue} />
      <br />
      <ul>
        {props.fields?.data?.item?.searchBy?.SearchByList?.map(
          (searchBy, index) => (
            <li key={index}>
              <JssText field={searchBy.displayName} />
              <br />
              <JssText field={searchBy.filter} />
              <br />
              <span>{searchBy?.filterValue?.jsonValue?.id}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <JssText field={props.fields?.data?.item?.numberOfCards?.jsonValue} />
      <br />
      <a href={props.fields?.data?.item?.blogUrl?.jsonValue?.value?.href}></a>
    </div>
  ); */
};
