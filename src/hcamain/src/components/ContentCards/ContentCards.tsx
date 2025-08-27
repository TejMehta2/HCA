/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  ImageField,
  RichText as JssRichText,
  Text as JssText,
  Link as JssLink,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Image from 'next/image';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
  proxyurl?: { path?: string; text: string };
}

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
      pages?: {
        PagesList?: PagesFields[];
      };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
    };
  };
}

export type ContentCardsProps = {
  params?: Params;
  fields?: Fields;
  dataSource: string;
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
  const { sitecoreContext } = useSitecoreContext();

  const isExperienceEditor = sitecoreContext?.pageEditing;
  const { showImage = true } = props;
  if (!props.fields?.data?.item) {
    return <ContentCardsDefaultComponent {...props} />;
  }

  const numberOfCards = props.params?.Columns || '3';

  if (
    !props.fields?.data?.item?.pages?.PagesList?.length &&
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

  const link = isExperienceEditor ? (
    <JssLink field={props.fields?.data?.item?.cTALink.jsonValue}></JssLink>
  ) : (
    props.fields?.data?.item?.cTALink?.jsonValue?.value?.href && (
      <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
        <SitecoreSvg>
          {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
        </SitecoreSvg>
        <JssRichText
          tag="div"
          field={{
            value: props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
          }}
        />
      </JssLink>
    )
  );

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );

  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';

  return (
    <CardBlock
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      variation={`${numberOfCards}-columns`}
      gapSize={'small'}
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <>
              <Text
                variation={props.params?.HeadingSize || 'display-3'}
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
      cta={link || <></>}
    >
      <>
        {props.fields?.data?.item?.pages?.PagesList?.map((card, index) => {
          const cardCtaUrl = card?.proxyurl?.path
            ? card?.proxyurl?.path
            : card?.url?.path;

          const cardCtaTextFromCard = card?.proxyurl?.path
            ? card?.proxyurl.text
            : card.abstractTitle?.value
              ? card.abstractTitle?.value
              : card.title?.value;

          return (
            <CardContent
              key={index}
              imageKeepAspectRatio={keepAspectRatio}
              image={
                showImage ? (
                  card.abstractImage?.jsonValue.value?.src &&
                    card.abstractImage?.jsonValue.value?.class !==
                    'scEmptyImage' ? (
                    <Image
                      src={card.abstractImage.jsonValue?.value?.src || ''}
                      alt={
                        (card.abstractImage.jsonValue?.value?.alt as string) ||
                        ''
                      }
                      width="773"
                      height="268"
                    />
                  ) : card.image?.jsonValue?.value?.src ? (
                    <Image
                      src={card.image?.jsonValue?.value?.src || ''}
                      alt={(card.image?.jsonValue?.value?.alt as string) || ''}
                      width="773"
                      height="268"
                    />
                  ) : undefined
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
                    {isExperienceEditor ||
                      props.fields?.data?.item?.cTACardText?.jsonValue?.value ? (
                      <JssRichText
                        tag="div"
                        field={props.fields?.data?.item?.cTACardText?.jsonValue}
                      />
                    ) : (
                      <Text tag="div">{cardCtaTextFromCard}</Text>
                    )}
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

export const WithoutImage = (props: ContentCardsProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ContentCardsDefaultComponent {...props} />;
  }

  return <WithImage {...props} showImage={false} />;
};
