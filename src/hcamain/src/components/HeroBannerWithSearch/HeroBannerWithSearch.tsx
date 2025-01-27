import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  ComponentRendering,
  Placeholder,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import HomepageHero, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HomepageHero/HomepageHero';
import SearchButton from '@component-library/components/SearchButton/SearchButton';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';
import { SEARCH_SUGGESTIONS_MODAL_ID } from 'lib/constants';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface Fields {
  data?: {
    contextItem?: {
      title?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
    };
    item?: {
      searchIcon?: {
        Icon?: {
          svgMarkup?: Field<string>;
        };
      };
      searchPlaceholder?: { jsonValue?: Field<string> };
      cTAHeading?: { jsonValue?: Field<string> };
    };
  };
}

export type HeroBannerWithSearchProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const HeroBannerWithSearchDefaultComponent = (
  props: HeroBannerWithSearchProps
): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          HeroBannerWithSearch no datasource
        </span>
      </div>
    </div>
  );
};

export const Default = (props: HeroBannerWithSearchProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeroBannerWithSearchDefaultComponent {...props} />;
  }

  return (
    <HomepageHero
      theme={props.params?.Theme || 'H-HCA-Tangerine'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h1'}
          variation={getDynamicTitleStyle(
            props.fields?.data?.contextItem?.title?.jsonValue?.value?.length
          )}
        >
          <JssRichText
            field={props.fields?.data?.contextItem?.title?.jsonValue}
          />
        </Text>
      }
      search={
        <SearchButton
          onClick={() => {
            const dialog = document.getElementById(
              SEARCH_SUGGESTIONS_MODAL_ID
            ) as HTMLDialogElement;
            dialog?.showModal();
          }}
        >
          <JssText
            field={props.fields?.data?.item?.searchPlaceholder?.jsonValue}
          />
        </SearchButton>
      }
      ctaTitle={
        <Text
          tag={getSubheadingTag(props.params?.HeadingTag, 'h2')}
          variation="subheading-1"
        >
          <JssText field={props.fields?.data?.item?.cTAHeading?.jsonValue} />
        </Text>
      }
      ctas={
        props.rendering ? (
          <Placeholder
            name={phKey}
            rendering={props.rendering}
            contentVariation="full-width"
          />
        ) : (
          <></>
        )
      }
      image={
        <NextJssImage
          field={props.fields?.data?.contextItem?.image?.jsonValue}
          next={{
            fill: true,
            sizes: '100vw',
            loading: 'eager',
            priority: true,
          }}
        />
      }
    />
  );
};
