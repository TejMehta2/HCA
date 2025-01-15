import React, { useEffect } from 'react';
import {
  Field,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { useInPageNavigationContext } from 'src/context/InPageNavigationContext';

interface Fields {
  Text?: Field<string>;
}

type BlogTextProps = {
  params?: Params;
  fields?: Fields;
};

const BlogTextDefaultComponent = (props: BlogTextProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Blog Text please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: BlogTextProps): JSX.Element => {
  const { addComponent } = useInPageNavigationContext();

  const tableOfContentsLinkTitle = props.params?.TableOfContentsLinkTitle;
  const hideEmptyComponent = !props.fields;
  const includeInTableOfContents =
    !props.params?.ExcludeFromTableOfContents &&
    !hideEmptyComponent &&
    tableOfContentsLinkTitle;

  const componentAnchorId = generateHtmlSafeId(tableOfContentsLinkTitle);

  useEffect(() => {
    if (includeInTableOfContents && tableOfContentsLinkTitle) {
      addComponent({
        Id: componentAnchorId,
        TableOfContentsLinkTitle: tableOfContentsLinkTitle,
      });
    }
  }, [includeInTableOfContents]);

  if (hideEmptyComponent) {
    return <BlogTextDefaultComponent {...props} />;
  }

  const isContainerized = props?.params?.Containerized === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles} id={componentAnchorId}>
        <JssRichText field={props.fields?.Text} />
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
    >
      <RichText>
        <JssRichText field={props.fields?.Text} />
      </RichText>
    </BlogContent>
  );
};
