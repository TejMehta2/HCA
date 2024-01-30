import React from 'react';
import {
  Field,
  Item,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import TabsBlock from '@component-library/site-components/TabsBlock/TabsBlock';
import Text from '@component-library/foundation/Text/Text';
import { HeadingSize, HeadingTag, Theme } from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';

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
    Image?: ImageFieldValue;
  };
};

interface Fields {
  Title?: Field<string>;
  Tabs?: TabsFields[];
}

type ImageAndTabsProps = {
  params: {
    Theme?: Theme;
    HeadingTag?: HeadingTag;
    HeadingSize?: HeadingSize;
    styles?: string;
  };
  fields?: Fields;
};

const ImageAndTabsDefaultComponent = (
  props: ImageAndTabsProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
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
  console.log(props);
  return (
    <TabsBlock
      theme={props.params?.Theme}
      title={
        <Text
          tag={props.params.HeadingTag}
          variation={props.params.HeadingSize}
        >
          <JssText field={props.fields.Title} />
        </Text>
      }
      tabsContent={props.fields.Tabs?.map((tab) => ({
        tab: {
          icon: (
            <span
              dangerouslySetInnerHTML={{
                __html: tab.fields.TabIcon?.fields?.SvgMarkup?.value || '',
              }}
            />
          ),
          label: tab.fields.TabTitle?.value,
        },
        image: <JssImage field={tab.fields?.Image} />,
        title: (
          <Text
            tag={getSubheadingTag(props.params.HeadingTag, 'p')}
            variation="display-5"
          >
            <JssText field={tab.fields.Title} />
          </Text>
        ),
        bodyCopy: (
          <Text tag="div" variation="body-large">
            <JssRichText tag="p" field={tab.fields.Text} />
          </Text>
        ),
      }))}
    />
  );
};
