import React from 'react';
import {
  Field,
  ImageField,
  RichText as JssRichText,
  Text as JssText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import { Theme } from '@component-library/foundation/Themes/Themes.types';
import { TextProps } from '@component-library/foundation/Text/Text.types';
import getSubheadingTag from 'lib/subheading-tag-getter';

interface PagesFields {
  title: Field<string>;
  description: Field<string>;
  image: ImageField;
  url: { path: string };
}

interface Fields {
  data: {
    item: {
      title: { jsonValue: Field<string> };
      cTACardText: { jsonValue: Field<string> };
      pages: {
        PagesList: PagesFields[];
      };
    };
  };
}

type ContentCardsProps = {
  params: {
    Theme: Theme; // TODO - this should reflect what CMS provides, not what FE consumes
    HeadingTag: keyof JSX.IntrinsicElements; // TODO - this should reflect what CMS provides, not what FE consumes
    HeadingSize: TextProps['variation']; // TODO - this should reflect what CMS provides, not what FE consumes
    styles: string;
  };
  fields: Fields;
};

const ContentCardsDefaultComponent = (
  props: ContentCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Content Cards no datasource</span>
    </div>
  </div>
);

export const Default = (props: ContentCardsProps): JSX.Element => {
  if (!props.fields) {
    return <ContentCardsDefaultComponent {...props} />;
  }
  return (
    <CardBlock
      variation={'3-columns'}
      gapSize={'small'}
      theme={props.params.Theme}
      title={
        <Text
          variation={props.params.HeadingSize}
          tag={props.params.HeadingTag}
        >
          <JssText
            tag={'span'}
            field={props.fields.data.item.title.jsonValue}
          />
        </Text>
      }
    >
      <>
        {props.fields.data.item.pages.PagesList.map((card, index) => (
          <CardContent
            key={index}
            image={<JssImage field={card.image} />}
            title={
              <Text
                tag={getSubheadingTag(props.params.HeadingTag, 'h2')}
                variation="heading-1"
              >
                <JssText field={card.title} />
              </Text>
            }
            bodyCopy={
              <Text tag="p" variation="body-medium">
                <JssRichText tag="span" field={card.description} />
              </Text>
            }
            link={
              !card.link ? (
                <a href={card.url.path}>
                  <span>
                    {props.fields.data.item.cTACardText.jsonValue.value}
                  </span>
                </a>
              ) : (
                <a href={card.link.url}>
                  <span>
                    {props.fields.data.item.cTACardText.jsonValue.value}
                  </span>
                </a>
              )
            }
          />
        ))}
      </>
    </CardBlock>
  );
};
