/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Item,
  Text as JssText,
  RichText as JssRichText,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import TabsBlock from '@component-library/site-components/TabsBlock/TabsBlock';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import RichText from '@component-library/core-components/RichText/RichText';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type TabsFields = Item & {
  fields?: {
    TabIcon?: HCAIconFields;
    TabTitle?: Field<string>;
    Text?: Field<string>;
    Title?: Field<string>;
    Image?: ImageField;
  };
};

interface Fields {
  Title?: Field<string>;
  Tabs?: TabsFields[];
}

type ImageAndTabsProps = {
  params?: Params;
  fields?: Fields;
};

const ImageAndTabsDefaultComponent = (
  props: ImageAndTabsProps
): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Tab no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: ImageAndTabsProps): JSX.Element => {
  if (!props.fields) {
    return <ImageAndTabsDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <TabsBlock
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag}
          variation={props.params?.HeadingSize}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
      tabsContent={props.fields?.Tabs?.map((tab) => ({
        tab: {
          icon: (
            <span
              dangerouslySetInnerHTML={{
                __html: tab?.fields?.TabIcon?.fields?.SvgMarkup?.value || '',
              }}
            />
          ),
          label: tab?.fields?.TabTitle?.value,
        },
        image: (
          <NextJssImage
            field={tab?.fields?.Image}
            editable={false}
            next={{
              width: 1000,
              height: 800,
              sizes: '(max-width: 768px) 100vw, 50vw',
            }}
          />
        ),
        title: (
          <Text
            tag={getSubheadingTag(props.params?.HeadingTag, 'p')}
            variation="display-5"
          >
            <JssText field={tab?.fields?.Title} />
          </Text>
        ),
        bodyCopy: (
          <Text tag="div" variation="body-large">
            <RichText>
              <JssRichText tag="p" field={tab?.fields?.Text} />
            </RichText>
          </Text>
        ),
      }))}
    />
  );
};
