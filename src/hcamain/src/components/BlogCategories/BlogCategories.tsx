import React, { useEffect } from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import ArticleCategories from '@component-library/site-components/ArticleCategories/ArticleCategories';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { useInPageNavigationContext } from 'src/context/InPageNavigationContext';

type CategoriesFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { targetItem: { id: string } };
};

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue: Field<string> };
      categories?: {
        categoriesList?: CategoriesFields[];
      };
      blogUrl?: { jsonValue?: LinkField };
    };
  };
}

type BlogCategoriesProps = {
  params?: Params;
  fields?: Fields;
};

const BlogCategoriesDefaultComponent = (
  props?: BlogCategoriesProps
): JSX.Element => (
  <div className={`component ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogCategories no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogCategoriesProps): JSX.Element => {
  const { addComponent } = useInPageNavigationContext();

  const tableOfContentsLinkTitle =
    props.params?.TableOfContentsLinkTitle ||
    props.fields?.data?.item?.title?.jsonValue?.value;
  const includeInTableOfContents =
    !props.params?.ExcludeFromTableOfContents && props.fields !== undefined;

  const componentAnchorId = generateHtmlSafeId(tableOfContentsLinkTitle);

  useEffect(() => {
    if (includeInTableOfContents && tableOfContentsLinkTitle) {
      addComponent({
        Id: componentAnchorId,
        TableOfContentsLinkTitle: tableOfContentsLinkTitle,
      });
    }
  }, [includeInTableOfContents]);

  if (!props.fields) {
    return <BlogCategoriesDefaultComponent {...props} />;
  }

  return (
    <ArticleCategories
      id={componentAnchorId}
      theme={props.params?.Theme || 'G-HCA-Orange'}
      title={
        <Text
          variation={props.params?.HeadingSize || 'display-3'}
          tag={props.params?.HeadingTag || 'h3'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      categories={props.fields?.data?.item?.categories?.categoriesList?.map(
        (category, index) => (
          <a
            href={
              props.fields?.data?.item?.blogUrl?.jsonValue?.value.href +
              '?' +
              category.filter?.value +
              '=' +
              category.filterValueGuid?.targetItem?.id
            }
            key={index}
          >
            <Icons iconName="iconFilterCircle" />
            <span>
              <JssText field={category?.displayName} />
            </span>
          </a>
        )
      )}
    />
  );
};
