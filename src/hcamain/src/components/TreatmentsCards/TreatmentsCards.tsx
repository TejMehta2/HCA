/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardContent from '@component-library/components/CardContent/CardContent';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type TreatmentsFields = {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue?: ImageField };
  url?: { path?: string };
  proxyurl?: { path?: string };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      treatments?: {
        TreatmentsList?: TreatmentsFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      id?: string;
      treatments?: {
        TreatmentsList?: TreatmentsFields[];
      };
    };
  };
}

type TreatmentsCardsProps = {
  params?: Params;
  fields: Fields;
};

const TreatmentsCardsDefaultComponent = (
  props: TreatmentsCardsProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TreatmentsCards no datasource</span>
    </div>
  </div>
);

interface WithImageProps extends TreatmentsCardsProps {
  showImage: boolean;
}

export const WithImage = (props: WithImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  const { showImage = true } = props;

  if (!props.fields?.data?.item) {
    return <TreatmentsCardsDefaultComponent {...props} />;
  }

  const numberOfCards = props.params?.Columns || '3';

  //  check for conditionId and append if it exists
  const allUrl = props.fields?.data?.contextItem?.id
    ? `${props.fields.data?.item?.cTALink?.jsonValue?.value.href}?conditionId=${props.fields?.data?.contextItem?.id}`
    : props.fields.data?.item?.cTALink?.jsonValue?.value.href;

  const link = isExperienceEditor ? (
    <JssLink field={props.fields?.data?.item?.cTALink.jsonValue}></JssLink>
  ) : (
    props.fields?.data?.item?.cTALink?.jsonValue?.value?.href && (
      <a href={allUrl}>
        <JssTextWithEntityName
          field={{
            value:
              props.fields.data?.item?.cTALink?.jsonValue?.value?.text || '',
          }}
          isRichText={true}
        />
      </a>
    )
  );

  //  treatments can be set via item or contextItem
  const cards = props.fields?.data?.item?.treatments?.TreatmentsList?.length
    ? props.fields?.data?.item?.treatments?.TreatmentsList
    : props.fields?.data?.contextItem?.treatments?.TreatmentsList;

  if (!cards?.length && !isExperienceEditor) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;
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
      cta={link || <></>}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <Text
              variation={props.params?.HeadingSize || 'display-3'}
              tag={headingTag}
            >
              <JssTextWithEntityName
                field={props?.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
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
                  field={props.fields?.data?.item?.text?.jsonValue}
                />
              </Text>
            )
          }
        />
      }
    >
      <>
        {cards?.map((card, index) => {
          const cardCtaUrl = card?.proxyurl?.path
            ? card?.proxyurl?.path
            : card?.url?.path;

          return (
            <CardContent
              key={index}
              image={
                showImage ? (
                  card.abstractImage?.jsonValue?.value?.src ? (
                    <NextJssImage
                      field={card.abstractImage.jsonValue}
                      editable={false}
                      next={{
                        width: 500,
                        height: 400,
                        sizes: '(max-width: 768px) 100vw, 30vw',
                      }}
                    />
                  ) : (
                    <NextJssImage
                      field={card.image?.jsonValue}
                      editable={false}
                      next={{
                        width: 500,
                        height: 400,
                        sizes: '(max-width: 768px) 100vw, 30vw',
                      }}
                    />
                  )
                ) : undefined
              }
              title={
                <Text
                  tag={getSubheadingTag(props.params?.HeadingTag, 'h2')}
                  variation="heading-1"
                >
                  {card.abstractTitle?.value ? (
                    <JssText field={card.abstractTitle} />
                  ) : (
                    <JssText field={card.title} />
                  )}
                </Text>
              }
              bodyCopy={
                <Text tag="div" variation="body-medium">
                  {card.abstractText?.value ? (
                    <JssRichText tag="div" field={card.abstractText} />
                  ) : (
                    <JssRichText tag="div" field={card.text} />
                  )}
                </Text>
              }
              link={
                cardCtaUrl ? (
                  <a href={cardCtaUrl}>
                    <JssRichText
                      tag="span"
                      field={props.fields?.data?.item?.cTACardText?.jsonValue}
                    />
                  </a>
                ) : (
                  <></>
                )
              }
            />
          );
        })}
      </>
    </CardBlock>
  );
};

export const WithoutImage = (props: TreatmentsCardsProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <TreatmentsCardsDefaultComponent {...props} />;
  }

  return <WithImage {...props} showImage={false} />;
};
