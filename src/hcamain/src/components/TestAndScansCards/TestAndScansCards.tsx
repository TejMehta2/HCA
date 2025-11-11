/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichText as JssRichText,
  Text as JssText,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type DiagnosisFields = {
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
      cTALink?: { jsonValue?: LinkField };
      testAndScans?: {
        TestAndScansList?: DiagnosisFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      id?: string;
      diagnosis?: {
        DiagnosisList?: DiagnosisFields[];
      };
    };
  };
}

type TestAndScansCardsProps = {
  params: Params;
  fields: Fields;
};

const TestAndScansCardsDefaultComponent = (
  props: TestAndScansCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TestAndScansCards no datasource</span>
    </div>
  </div>
);

interface WithImageProps extends TestAndScansCardsProps {
  showImage: boolean;
}

export const WithImage = (props: WithImageProps): JSX.Element => {
  const { showImage = true } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields) {
    return <TestAndScansCardsDefaultComponent {...props} />;
  }

  const numberOfCards = props.params?.Columns || '3';

  const queryParam = props.fields.data?.contextItem?.id
    ? '?conditionId=' + props.fields.data?.contextItem?.id
    : '';

  const link =
    props.fields?.data?.item?.cTALink?.jsonValue &&
    (!isExperienceEditor ? (
      props.fields?.data?.item?.cTALink?.jsonValue?.value.href &&
        props.fields?.data?.item?.cTALink?.jsonValue?.value.text ? (
        <JssLink
          field={props.fields?.data?.item?.cTALink?.jsonValue}
          href={
            props.fields?.data?.item?.cTALink?.jsonValue.value.href + queryParam
          }
        >
          <JssTextWithEntityName
            field={{
              value: props.fields?.data?.item?.cTALink?.jsonValue?.value.text,
            }}
            isRichText={true}
          />
        </JssLink>
      ) : undefined
    ) : (
      <JssLink
        field={props.fields?.data?.item?.cTALink?.jsonValue}
        href={
          props.fields?.data?.item?.cTALink?.jsonValue.value.href + queryParam
        }
      />
    ));

  const getCards = (cards?: DiagnosisFields[]) => {
    if (!cards) return;

    const limit = props.fields?.data?.item?.numberOfCards?.jsonValue?.value
      ? +props.fields?.data?.item?.numberOfCards?.jsonValue?.value
      : -1;

    return (
      <>
        {cards.slice(0, limit)?.map((card, index) => {
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
                        height: 500,
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
                <Text tag="p" variation="body-medium">
                  {card.abstractText?.value ? (
                    <JssRichText tag="span" field={card.abstractText} />
                  ) : (
                    <JssRichText tag="span" field={card.text} />
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
    );
  };

  const cardSource =
    props.fields?.data?.contextItem?.diagnosis?.DiagnosisList ||
    props.fields?.data?.item?.testAndScans?.TestAndScansList;

  const cards = getCards(cardSource);

  if (!cardSource?.length && !isExperienceEditor) {
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
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <Text
              variation={props.params?.HeadingSize || 'display-3'}
              tag={headingTag}
            >
              <JssTextWithEntityName
                field={props.fields?.data?.item?.title?.jsonValue}
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
      cta={link}
    >
      {cards && cards}
    </CardBlock>
  );
};

export const WithoutImage = (props: TestAndScansCardsProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <TestAndScansCardsDefaultComponent {...props} />;
  }

  return <WithImage {...props} showImage={false} />;
};
