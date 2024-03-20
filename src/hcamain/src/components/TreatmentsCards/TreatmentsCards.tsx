import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  Link as JssLink,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardContent from '@component-library/components/CardContent/CardContent';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import { CardBlockProps } from '@component-library/site-components/CardBlock/CardBlock.types';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type TreatmentsFields = {
  abstractTitle?: Field<string>;
  abstractText?: Field<string>;
  abstractImage?: { jsonValue?: ImageField };
  title?: { value?: Field<string> };
  text?: { value?: Field<string> };
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
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields) {
    return <TreatmentsCardsDefaultComponent {...props} />;
  }

  const columns: CardBlockProps['variation'] =
    props.params?.Columns === 4 ? '4-columns' : '3-columns';

  const link = props.fields?.data?.contextItem?.id ? (
    <a
      href={`${props.fields.data?.item?.cTALink?.jsonValue?.value}?conditionId=${props.fields?.data?.contextItem?.id}`}
    >
      {props.fields.data?.item?.cTALink?.jsonValue?.value?.text}
    </a>
  ) : (
    props.fields?.data?.item?.cTALink?.jsonValue &&
    (!isExperienceEditor ? (
      <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
        <JssRichText
          tag="span"
          field={{
            value: props.fields.data?.item?.cTALink?.jsonValue?.value?.text,
          }}
        />
      </JssLink>
    ) : (
      <JssLink field={props.fields.data?.item?.cTALink?.jsonValue?.value} />
    ))
  );

  const cards = props.fields?.data?.item?.treatments?.TreatmentsList?.length
    ? props.fields?.data?.item?.treatments?.TreatmentsList
    : props.fields?.data?.contextItem?.treatments?.TreatmentsList;

  console.log(props);
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
              variation={props.params?.HeadingSize || 'heading-1'}
              tag={props.params?.HeadingTag || 'h2'}
            >
              <JssText
                tag={'span'}
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
                <JssImage field={card.abstractImage?.jsonValue} />
              ) : undefined
            }
            title={
              <Text
                tag={getSubheadingTag(props.params?.HeadingTag, 'h2')}
                variation="heading-1"
              >
                <JssText field={card.abstractTitle} />
              </Text>
            }
            bodyCopy={
              <Text tag="p" variation="body-medium">
                <JssRichText tag="span" field={card.abstractText} />
              </Text>
            }
            link={
              <a href={card?.url?.path}>
                <span>
                  {props.fields?.data?.item?.cTACardText?.jsonValue?.value}
                </span>
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
