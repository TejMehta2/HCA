import React, { type JSX } from 'react';
import {
  Field,
  RichText,
  LinkField,
  Text as JSSText,
} from '@sitecore-content-sdk/nextjs';
import HeaderBlogDetails from '@component-library/site-components/HeaderBlogDetails/HeaderBlogDetails';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import Tags from '@component-library/core-components/Tags/Tags';
import Link from 'next/link';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import { getDynamicTitleStyle } from '@component-library/site-components/HeaderPlain/HeaderPlain';
import { AuthorFields } from 'src/types/authorFields.GraphQL';
import { isSitecoreDateSet } from 'lib/utility-functions/isSitecoreDateSet';
import { MapAuthorsToBlockQuotes } from 'src/components/Page Content/Authors/Authors.mapping.GraphQL';
import Themes from '@component-library/foundation/Themes/Themes';
import { normalizeId } from 'lib/sitecore/templateIds';
import { ComponentWithContextProps } from 'lib/component-props';

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
      lastChecked?: { jsonValue?: Field<string> };
      authors?: { targetItems?: AuthorFields[] };
      articleType?: { targetItem?: ArticleTypeFields };
      category?: {
        targetItems?: {
          id: string;
          name: string;
        }[];
      };
    };
    settings?: {
      blogSearchResultsBaseUrl?: { jsonValue?: LinkField };
    };
  };
}

type BlogDetailsHeaderProps = ComponentWithContextProps & {
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
  const isExperienceEditor = props.page.mode.isEditing;
  const queryString = 'articleTypeId';
  const currentArticleId =
    props.fields?.data?.contextItem?.articleType?.targetItem?.id?.toString();
  const formattedCurrentArticleId = normalizeId(currentArticleId);
  if (!props.fields) {
    return <BlogDetailsHeaderDefaultComponent {...props} />;
  }

  const dateSet = isSitecoreDateSet(
    props.fields?.data?.contextItem?.date?.jsonValue?.value
  );

  const lastCheckedSet = isSitecoreDateSet(
    props.fields?.data?.contextItem?.lastChecked?.jsonValue?.value
  );

  const authors = MapAuthorsToBlockQuotes(
    props?.fields?.data?.contextItem?.authors?.targetItems,
    false
  );

  return (
    <HeaderBlogDetails
      theme={props.params?.Theme || 'A-HCA-White'}
      tag={
        <>
          {props.fields?.data?.contextItem?.articleType?.targetItem?.title ? (
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
          ) : null}
          {props.fields?.data?.contextItem?.category?.targetItems?.map(
            (categoryItem, index) =>
              categoryItem?.name ? (
                <Themes theme="M-HCA-Goldenrod-20" key={index}>
                  <Tags contentVariation="quote">
                    <Link
                      href={
                        props.fields?.data?.settings?.blogSearchResultsBaseUrl
                          ?.jsonValue?.value.href +
                        '?serviceLineId=' +
                        normalizeId(categoryItem.id ?? '')
                      }
                    >
                      <span>{categoryItem.name}</span>
                    </Link>
                  </Tags>
                </Themes>
              ) : null
          )}
        </>
      }
      authors={authors}
      lastChecked={
        lastCheckedSet || isExperienceEditor ? (
          <JssDate
            field={props.fields?.data?.contextItem?.lastChecked?.jsonValue}
          />
        ) : undefined
      }
      date={
        dateSet || isExperienceEditor ? (
          <JssDate field={props.fields?.data?.contextItem?.date?.jsonValue} />
        ) : undefined
      }
      title={
        <Text
          tag={props.params?.HeadingTag || 'h1'}
          variation={
            props.params?.HeadingSize ||
            getDynamicTitleStyle(
              props.fields?.data?.contextItem?.title?.jsonValue?.value.length
            )
          }
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
