/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  RichText as JssRichText,
  Text as JssText,
  Link as JssLink,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import CardComparison from '@component-library/components/CardComparison/CardComparison';
import {
  PackageItem,
  PricingVariants,
} from '@component-library/components/CardComparison/CardComparison.types';

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      packages?: {
        targetItems: PackageCard[];
      };
    };
  };
}

// Pricing variant item
export interface PricingVariantProp {
  price?: { jsonValue?: Field<string> };
  discount?: { jsonValue?: Field<string> };
  period?: { jsonValue?: Field<string> };
}

// Label item for included/excluded items
export interface PackageItemProp {
  label: { value?: string };
  summary: { value?: string };
  info: { value?: string };
}

// Package main item
export interface PackageCard {
  title: { jsonValue: Field<string> };
  description: { jsonValue?: Field<string> };
  featuresLabel: { jsonValue?: Field<string> };
  cTA: { jsonValue: LinkField };
  tag: { jsonValue?: Field<string> };
  alternativeTagVariant: {
    value: string;
    boolValue: boolean;
  };
  pricingVariants: {
    targetItems: PricingVariantProp[];
  };
  includedPackageItems: {
    targetItems: PackageItemProp[];
  };
  excludedPackageItems: {
    targetItems: PackageItemProp[];
  };
}

export type PackageComparisonProps = {
  params?: Params;
  fields?: Fields;
  dataSource: string;
};

const PackageComparisonDefaultComponent = (
  props: PackageComparisonProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Packages Comparison Cards. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: PackageComparisonProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields?.data?.item) {
    return <PackageComparisonDefaultComponent {...props} />;
  }

  const numberOfCards = props.params?.Columns || '2';

  if (
    !props.fields?.data?.item?.packages?.targetItems?.length &&
    !isExperienceEditor
  ) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );
  return (
    <CardBlock
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      variation={`${numberOfCards}-columns`}
      gapSize={'small'}
      theme={props.params?.Theme || 'J-HCA-Tangerine-20'}
      header={
        <AdvancedBlockHeader
          paddingSize="medium"
          contentVariation="centered"
          title={
            <>
              <Text
                variation={props.params?.HeadingSize || 'display-2'}
                tag={headingTag}
              >
                <JssText field={props.fields?.data?.item?.title?.jsonValue} />
              </Text>
            </>
          }
          subtitle={
            !isExperienceEditor ? (
              props.fields?.data?.item?.heading?.jsonValue?.value ? (
                <Text tag={subheadingTag} variation={'subheading-1'}>
                  <JssText
                    field={props.fields?.data?.item?.heading?.jsonValue}
                  />
                </Text>
              ) : (
                <></>
              )
            ) : (
              <Text tag="span" variation={'subheading-1'}>
                <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
              </Text>
            )
          }
          body={
            (props.fields?.data?.item?.text?.jsonValue ||
              isExperienceEditor) && (
              <Text tag="div" variation="body-large">
                <JssRichText
                  tag="div"
                  field={props.fields?.data?.item?.text?.jsonValue}
                />
              </Text>
            )
          }
        />
      }
    >
      <>
        {props.fields?.data?.item?.packages?.targetItems?.map((card, index) => {
          return (
            <CardComparison
              key={index}
              title={
                <Text
                  tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                  variation="display-5"
                >
                  <JssText field={card.title.jsonValue} />
                </Text>
              }
              description={
                <Text tag="div" variation="body-large">
                  <JssRichText tag="div" field={card.description.jsonValue} />
                </Text>
              }
              cta={
                (card.cTA || isExperienceEditor) && (
                  <JssLink field={card.cTA.jsonValue} />
                )
              }
              tag={
                (card.tag || isExperienceEditor) && (
                  <JssText field={card.tag.jsonValue} />
                )
              }
              tagVariant={card.alternativeTagVariant.boolValue}
              featuresLabel={
                (card.featuresLabel || isExperienceEditor) && (
                  <JssText field={card.featuresLabel.jsonValue} />
                )
              }
              pricingVariants={mapPricingVariants(card, isExperienceEditor)}
              includedPackageItems={mapPackageItems(
                card?.includedPackageItems?.targetItems
              )}
              excludedPackageItems={mapPackageItems(
                card?.excludedPackageItems?.targetItems
              )}
            />
          );
        })}
      </>
    </CardBlock>
  );
};

function mapPricingVariants(
  pkg: PackageCard,
  isExperienceEditor: boolean | undefined
): PricingVariants[] {
  return (pkg.pricingVariants.targetItems || []).map((item) => ({
    price: (item?.price?.jsonValue || isExperienceEditor) && (
      <>
        £<JssText field={item?.price?.jsonValue} />
      </>
    ),
    period: (item?.period?.jsonValue || isExperienceEditor) && (
      <>
        / <JssText field={item.period?.jsonValue} />
      </>
    ),
    discount:
      item?.discount?.jsonValue?.value || isExperienceEditor ? (
        <JssText field={item.discount?.jsonValue} />
      ) : undefined,
  }));
}

function mapPackageItems(packageItems: PackageItemProp[]): PackageItem[] {
  return (packageItems || []).map((item) => ({
    label: item?.label?.value ?? '',
    summary: item?.summary?.value || undefined,
    info: item?.info?.value || undefined,
  }));
}
