import React from 'react';
import {
  Field,
  ImageField,
  Image as JssImage,
  Text as JssText,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import HomepageHero from '@component-library/site-components/HomepageHero/HomepageHero';
import SearchButton from '@component-library/components/SearchButton/SearchButton';
import Text from '@component-library/foundation/Text/Text';
import { Theme, HeadingSize, HeadingTag } from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';

type HCAIconFields = {
  fields: {
    svgMarkup: Field<string>;
  };
};

interface Fields {
  data: {
    contextItem: {
      title: { jsonValue: Field<string> };
      image: { jsonValue: ImageField };
    };
    item: {
      searchIcon: {
        Icon: HCAIconFields;
      };
      searchPlaceholder: { jsonValue: Field<string> };
      cTAHeading: { jsonValue: Field<string> };
    };
  };
}

type HeroBannerWithSearchProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
  rendering: ComponentRendering;
  fields: Fields;
};

const HeroBannerWithSearchDefaultComponent = (
  props: HeroBannerWithSearchProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          HeroBannerWithSearch no datasource
        </span>
      </div>
    </div>
  );
};

export const Default = (props: HeroBannerWithSearchProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeroBannerWithSearchDefaultComponent {...props} />;
  }
  return (
    <HomepageHero
      theme={props.params.Theme || 'H-HCA-Tangerine'}
      title={
        <Text
          tag={props.params.HeadingTag || 'h1'}
          variation={props.params.HeadingSize || 'display-1'}
        >
          <JssText field={props.fields.data.contextItem.title.jsonValue} />
        </Text>
      }
      search={
        <SearchButton>
          <JssText
            field={props.fields.data.item?.searchPlaceholder.jsonValue}
          />
        </SearchButton>
      }
      ctaTitle={
        <Text
          tag={getSubheadingTag(props.params.HeadingTag, 'h2')}
          variation="subheading-1"
        >
          <JssText field={props.fields.data.item?.cTAHeading.jsonValue} />
        </Text>
      }
      ctas={
        <>
          <Placeholder
            name={phKey}
            rendering={props.rendering}
            contentVariation="full-width"
          />
        </>
      }
      image={
        <JssImage field={props.fields.data.contextItem.image?.jsonValue} />
      }
    />
  );
};
