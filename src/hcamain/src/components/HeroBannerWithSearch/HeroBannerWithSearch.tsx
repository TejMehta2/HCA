import React from 'react';
import {
  Field,
  ImageField,
  Image as JssImage,
  RichText,
  Text as JssText,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import HomepageHero from '@component-library/site-components/HomepageHero/HomepageHero';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Text from '@component-library/foundation/Text/Text';
import { Theme, HeadingSize, HeadingTag } from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface Fields {
  Title: Field<string>;
  Image: ImageField;
  SearchIcon: HCAIconFields;
  SearchPlaceholder: Field<string>;
  CTAHeading: Field<string>;
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

  console.log(props);
  return (
    <HomepageHero
      theme={props.params.Theme || 'D-HCA-Light-Orange'}
      title={
        <Text
          tag={props.params.HeadingTag || 'h1'}
          variation={props.params.HeadingSize || 'display-1'}
        >
          <JssText field={props.fields.Title} />
        </Text>
      }
      search={
        <SearchBar
          placeholder={<RichText field={props.fields.SearchPlaceholder} />}
        />
      }
      ctaTitle={
        <Text
          tag={getSubheadingTag(props.params.HeadingTag, 'h2')}
          variation="subheading-1"
        >
          <JssText field={props.fields.CTAHeading} />
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
      image={<JssImage field={props.fields.Image} />}
    />
  );
};
