import React from 'react';
import {
  Field,
  ImageField,
  RichText as JssRichText,
  Text as JssText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import { CardBlockProps } from '@component-library/site-components/CardBlock/CardBlock.types';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface PagesFields {
  title?: Field<string>;
  text?: Field<string>;
  image?: ImageField;
  url?: { path?: string };
}

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
      pages?: {
        PagesList?: PagesFields[];
      };
    };
  };
}

type ContentCardsProps = {
  params?: Params;
  fields?: Fields;
};

const ContentCardsDefaultComponent = (
  props: ContentCardsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Content Cards. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

interface WithImageProps extends ContentCardsProps {
  showImage: boolean;
}

export const WithImage = (props: WithImageProps): JSX.Element => {
  const { showImage = true } = props;
  if (!props.fields?.data?.item) {
    return <ContentCardsDefaultComponent {...props} />;
  }

  const columns: CardBlockProps['variation'] =
    props.params?.Columns === '4' ? '4-columns' : '3-columns';

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
              <JssText
                tag={'span'}
                field={props.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
          }
        />
      }
    >
      <>
        {props.fields?.data?.item?.pages?.PagesList?.map((card, index) => (
          <CardContent
            key={index}
            image={showImage ? <JssImage field={card.image} /> : undefined}
            title={
              <Text
                tag={getSubheadingTag(props.params?.HeadingTag, 'h2')}
                variation="heading-1"
              >
                <JssText field={card.title} />
              </Text>
            }
            bodyCopy={
              <Text tag="p" variation="body-medium">
                <JssRichText tag="span" field={card.text} />
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

export const WithoutImage = (props: ContentCardsProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ContentCardsDefaultComponent {...props} />;
  }

  return <WithImage {...props} showImage={false} />;
};
