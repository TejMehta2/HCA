import React from 'react';
import {
  Field,
  RichText,
  LinkField,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeaderBlogDetails from '@component-library/site-components/HeaderBlogDetails/HeaderBlogDetails';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import Tags from '@component-library/core-components/Tags/Tags';
import Link from 'next/link';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';

type ArticleTypeFields = {
  id?: string;
  title?: { value?: string };
};

interface Fields {
  data?: {
    contextItem?: {
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      date?: { jsonValue?: Field<string> };
      articleType?: { targetItem?: ArticleTypeFields };
    };
    settings?: {
      blogSearchResultsBaseUrl?: { jsonValue?: LinkField };
    };
  };
}

type BlogDetailsHeaderProps = {
  params?: Params;
  fields?: Fields;
};

const BlogDetailsHeaderDefaultComponent = (
  props: BlogDetailsHeaderProps
): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogDetailsHeaderProps): JSX.Element => {
  const queryString = 'articleTypeId';
  const currentArticleId =
    props.fields?.data?.contextItem?.articleType?.targetItem?.id?.toString();
  const formattedCurrentArticleId =
    currentArticleId && currentArticleId.replace(/[-{}]/g, '').toLowerCase();
  if (!props.fields) {
    return <BlogDetailsHeaderDefaultComponent {...props} />;
  }

  return (
    <HeaderBlogDetails
      theme={props.params?.Theme || 'A-HCA-White'}
      tag={
        props.fields?.data?.contextItem?.articleType?.targetItem?.title ? (
          <Tags contentVariation="quote">
            <Link
              href={
                props.fields?.data?.settings?.blogSearchResultsBaseUrl
                  ?.jsonValue?.value.href +
                '?' +
                queryString +
                '=' +
                formattedCurrentArticleId
              }
            >
              <JSSText
                field={
                  props.fields?.data?.contextItem?.articleType?.targetItem
                    ?.title
                }
              />
            </Link>
          </Tags>
        ) : (
          <></>
        )
      }
      date={
        <JssDate field={props.fields?.data?.contextItem?.date?.jsonValue} />
      }
      title={
        <Text
          tag={props.params?.HeadingTag || 'h1'}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JSSText field={props.fields?.data?.contextItem?.title?.jsonValue} />
        </Text>
      }
      bodyCopy={
        <Text tag="div" variation="body-large">
          <RichText field={props.fields?.data?.contextItem?.text?.jsonValue} />
        </Text>
      }
    />
  );
};
