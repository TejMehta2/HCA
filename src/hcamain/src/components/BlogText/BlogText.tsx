/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

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
  if (!props.fields) {
    return <BlogTextDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const isContainerized = props?.params?.Containerized === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles} id={componentAnchorId}
        {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      >
        <JssRichText field={props.fields?.Text} />
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      <RichText>
        <JssRichText field={props.fields?.Text} />
      </RichText>
    </BlogContent>
  );
};
