/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Link as JssLink,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import CardContent from '@component-library/components/CardContent/CardContent';
import Link from 'next/link';
import getSubheadingTag from 'lib/subheading-tag-getter';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type HCAIcon = {
  svgMarkup?: Field<string>;
};
interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
}

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: HCAIcon;
      };
      cTALink: { jsonValue: LinkField };
      department?: {
        DepartmentList?: {
          conditions?: {
            ConditionList?: PagesFields[];
          };
          children?: {
            results?: {
              conditions?: {
                ConditionList?: PagesFields[];
              };
            }[];
          };
        }[];
      };
      numberOfCards?: { jsonValue?: Field<3 | 4> };
      displayAllCards?: { jsonValue?: Field<boolean> };
      cTAText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      conditions?: {
        ConditionList?: PagesFields[];
      };
      children?: {
        results?: {
          conditions: {
            ConditionList?: PagesFields[];
          };
        }[];
      };
    };
  };
}

type ConditionsProps = {
  params?: Params;
  fields?: Fields;
  withImage?: boolean;
};

const ConditionsDefaultComponent = (props: ConditionsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Conditions please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const WithImage = (props: ConditionsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <ConditionsDefaultComponent {...props} />;
  }
  const { withImage = true } = props;
  const item = props.fields?.data?.item;
  const contextItem = props.fields?.data?.contextItem;

  // Order of cardData: conditions from Specialty Page and then conditions from all Subspecialty Pages
  let cardData: PagesFields[] = [];

  // Unpack deeply nested card data for Specialty and sub-Specialty pages
  item?.department?.DepartmentList?.forEach((department) => {
    cardData = cardData.concat(department.conditions?.ConditionList || []);
    department?.children?.results?.forEach((child) => {
      cardData = cardData.concat(child?.conditions?.ConditionList || []);
    });
  });

  // Unpack card data for content pages, and sub-pages from context
  const conditionList = contextItem?.conditions?.ConditionList || [];
  cardData = cardData.concat(conditionList);
  contextItem?.children?.results?.forEach((child) => {
    cardData = cardData.concat(child.conditions?.ConditionList || []);
  });

  if (!cardData?.length && !isExperienceEditor) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const displayAllCards = item?.displayAllCards?.jsonValue?.value;
  const numberOfCards = item?.numberOfCards?.jsonValue?.value || 3;
  const limit = displayAllCards ? 999 : numberOfCards;

  const getCta = () => {
    const ctaField = props.fields?.data?.item?.cTALink;
    if (!ctaField) return undefined;
    if (isExperienceEditor) return <JssLink field={ctaField.jsonValue} />;
    if (displayAllCards) return undefined;
    if (!ctaField.jsonValue.value.href || !ctaField.jsonValue.value.text)
      return undefined;
    return (
      <a href={ctaField.jsonValue.value.href}>
        <SitecoreSvg>
          {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
        </SitecoreSvg>
        <JssTextWithEntityName
          field={{
            value: ctaField.jsonValue.value.text || '',
          }}
          isRichText={true}
        />
      </a>
    );
  };

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
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          subtitle={
            !isExperienceEditor ? (
              props.fields?.data?.item?.heading?.jsonValue?.value ? (
                <Text tag={subheadingTag} variation={'subheading-1'}>
                  {props.fields.data?.item?.heading?.jsonValue?.value}
                </Text>
              ) : (
                <></>
              )
            ) : (
              <Text variation={'subheading-1'}>
                <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
              </Text>
            )
          }
          body={
            isExperienceEditor ? (
              props.fields?.data?.item?.title?.jsonValue?.value ? (
                <Text variation={'body-large'}>
                  <JssTextWithEntityName
                    field={props.fields?.data?.item?.text?.jsonValue}
                  />
                </Text>
              ) : (
                <></>
              )
            ) : props.fields?.data?.item?.text?.jsonValue?.value ? (
              <Text variation={'body-large'}>
                <JssTextWithEntityName
                  field={props.fields?.data?.item?.text?.jsonValue}
                />
              </Text>
            ) : undefined
          }
          title={
            !isExperienceEditor ? (
              props.fields?.data?.item?.title?.jsonValue?.value ? (
                <Text
                  variation={props.params?.HeadingSize || 'display-3'}
                  tag={headingTag}
                >
                  <JssTextWithEntityName
                    field={props.fields?.data?.item?.title?.jsonValue}
                  />
                </Text>
              ) : (
                <></>
              )
            ) : (
              <Text
                variation={props.params?.HeadingSize || 'display-3'}
                tag={headingTag}
              >
                <JssTextWithEntityName
                  field={props.fields?.data?.item?.title?.jsonValue}
                />
              </Text>
            )
          }
        />
      }
      cta={getCta()}
    >
      <>
        {cardData.slice(0, limit).map((item, index) => {
          const imageField = item.abstractImage?.jsonValue.value?.src
            ? item.abstractImage?.jsonValue
            : item.image?.jsonValue;

          return (
            <CardContent
              key={index}
              image={
                withImage ? (
                  <NextJssImage
                    field={imageField}
                    editable={false}
                    next={{
                      width: 500,
                      height: 400,
                      sizes: '(max-width: 768px) 100vw, 30vw',
                    }}
                  />
                ) : undefined
              }
              title={
                <Text
                  tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                  variation="display-4"
                >
                  <JssText
                    field={
                      item?.abstractTitle?.value
                        ? item?.abstractTitle
                        : item?.title
                    }
                  />
                </Text>
              }
              bodyCopy={
                <Text tag="p" variation="body-large">
                  <JssText
                    field={
                      item?.abstractText?.value
                        ? item?.abstractText
                        : item?.text
                    }
                  />
                </Text>
              }
              link={
                item.url?.path ? (
                  <Link href={item.url?.path}>
                    <JssText
                      field={props.fields?.data?.item?.cTAText?.jsonValue}
                    />
                  </Link>
                ) : undefined
              }
            />
          );
        })}
      </>
    </CardBlock>
  );
};

export const WithoutImage = (props: ConditionsProps): JSX.Element => {
  return <WithImage {...props} withImage={false} />;
};
