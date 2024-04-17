import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardContent from '@component-library/components/CardContent/CardContent';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import { CardBlockProps } from '@component-library/site-components/CardBlock/CardBlock.types';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';

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
  const { showImage = true } = props;

  if (!props.fields) {
    return <TreatmentsCardsDefaultComponent {...props} />;
  }

  const columns: CardBlockProps['variation'] =
    props.params?.Columns === '4' ? '4-columns' : '3-columns';

  //  check for conditionId and append if it exists
  const allUrl = props.fields?.data?.contextItem?.id
    ? `${props.fields.data?.item?.cTALink?.jsonValue?.value.href}?conditionId=${props.fields?.data?.contextItem?.id}`
    : props.fields.data?.item?.cTALink?.jsonValue?.value.href;

  const link = (
    <a href={allUrl}>
      <JssTextWithEntityName
        field={{
          value: props.fields.data?.item?.cTALink?.jsonValue?.value?.text || '',
        }}
        isRichText={true}
      />
    </a>
  );

  //  treatments can be set via item or contextItem
  const cards = props.fields?.data?.item?.treatments?.TreatmentsList?.length
    ? props.fields?.data?.item?.treatments?.TreatmentsList
    : props.fields?.data?.contextItem?.treatments?.TreatmentsList;

  return (
    <CardBlock
      variation={columns}
      gapSize={'small'}
      theme={props.params?.Theme || 'A-HCA-White'}
      cta={link}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <Text
              variation={props.params?.HeadingSize || 'display-3'}
              tag={props.params?.HeadingTag || 'h2'}
            >
              <JssTextWithEntityName
                field={props?.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
          }
        />
      }
    >
      <>
        {cards?.map((card, index) => (
          <CardContent
            key={index}
            image={
              showImage ? (
                card.abstractImage?.jsonValue?.value?.src ? (
                  <JssImage
                    field={card.abstractImage.jsonValue}
                    editable={false}
                  />
                ) : (
                  <JssImage field={card.image?.jsonValue} editable={false} />
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
              <a href={card?.url?.path}>
                <JssText
                  tag="span"
                  field={props.fields?.data?.item?.cTACardText?.jsonValue}
                />
              </a>
            }
          />
        ))}
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
