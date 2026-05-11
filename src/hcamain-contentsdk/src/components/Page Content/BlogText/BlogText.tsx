import React, { useMemo } from 'react';
import {
  Field,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';

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
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  // Update H2 tag in the Rich Text field value if not in Editing mode
  const processedField = useMemo(() => {
    const rawValue = props.fields?.Text?.value;

    if (
      isExperienceEditor ||
      !rawValue ||
      props?.params?.ExtractH2Links !== '1'
    ) {
      return props?.fields?.Text;
    }

    const transformedValue = rawValue.replace(
      /<h2[^>]*>(.*?)<\/h2>/gi,
      (_match, fullContent) => {
        const cleanText = fullContent.replace(/<[^>]*>/g, '').trim();
        const cleanId = generateHtmlSafeId(cleanText);
        //h2 format required by TOC
        return `<h2 id="${cleanId}" data-subnav-link-title="${cleanText}">${fullContent}</h2>`;
      }
    );

    return {
      ...props?.fields?.Text,
      value: transformedValue,
    };
  }, [props?.fields?.Text, props?.params?.ExtractH2Links, isExperienceEditor]);

  if (!props.fields) {
    return <BlogTextDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
    >
      <RichText>
        <JssRichText field={processedField} />
      </RichText>
    </BlogContent>
  );
};
