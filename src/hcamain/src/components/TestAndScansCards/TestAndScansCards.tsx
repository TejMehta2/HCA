import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichText as JssRichText,
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import { CardBlockProps } from '@component-library/site-components/CardBlock/CardBlock.types';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type DiagnosisFields = {
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

  const columns: CardBlockProps['variation'] =
    props.params?.Columns === '4' ? '4-columns' : '3-columns';

  const queryParam = props.fields.data?.contextItem?.id
    ? '?conditionId=' + props.fields.data?.contextItem?.id
    : '';

  const link =
    props.fields?.data?.item?.cTALink?.jsonValue &&
    (!isExperienceEditor ? (
      <JssLink
        field={props.fields?.data?.item?.cTALink?.jsonValue}
        href={
          props.fields?.data?.item?.cTALink?.jsonValue.value.href + queryParam
        }
      >
        <JssTextWithEntityName
          field={{
            value: props.fields?.data?.item?.cTACardText?.jsonValue?.value,
          }}
          isRichText={true}
        />
      </JssLink>
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
        {cards.slice(0, limit)?.map((card, index) => (
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
    );
  };

  const cards = props.fields?.data?.contextItem?.diagnosis?.DiagnosisList
    ? getCards(props.fields?.data?.contextItem?.diagnosis?.DiagnosisList)
    : getCards(props.fields?.data?.item?.testAndScans?.TestAndScansList);

  return (
    <CardBlock
      variation={columns}
      gapSize={'small'}
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <Text
              variation={props.params?.HeadingSize || 'heading-1'}
              tag={props.params?.HeadingTag || 'h2'}
            >
              <JssTextWithEntityName
                field={props.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
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
