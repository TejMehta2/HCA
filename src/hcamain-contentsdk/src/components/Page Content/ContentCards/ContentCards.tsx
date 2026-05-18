import { type JSX } from 'react';
import { ComponentWithContextProps } from 'lib/component-props';
/* eslint-disable prettier/prettier */

import {
  Field,
  ImageField,
  RichText as JssRichText,
  Text as JssText,
  Link as JssLink,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import getSubheadingTag from 'lib/subheading-tag-getter';
import Params from 'src/types/params';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Image from 'next/image';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import { upsertQuerystringParam } from 'lib/utility-functions/addThumbnailParameter';

interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string; url?: string };
  proxyurl?: { jsonValue: LinkField; path?: string; text: string };
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

export type ContentCardsProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  dataSource: string;
};

const ContentCardsDefaultComponent = (
  props: ContentCardsProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

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
  const isExperienceEditor = props.page.mode.isEditing;
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

  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

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
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      variation={`${numberOfCards}-columns` as '2-columns' | '3-columns' | '4-columns'}
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
          const cardCtaUrlLegacy = card?.proxyurl?.path
            ? card?.proxyurl?.path
            : card?.url?.path;

          const cardCtaUrlV2 = card?.proxyurl?.jsonValue?.value?.href
            ? card?.proxyurl?.jsonValue?.value?.href
            : card?.url?.url;

          //Next time you see this remove cardCtaUrlLegacy. Kept here to avoid breaking components during the release. HED-2287
          const cardCtaUrl = cardCtaUrlV2 || cardCtaUrlLegacy;

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
                      src={upsertQuerystringParam(
                        card.abstractImage.jsonValue?.value?.src || '',
                        't',
                        'w750'
                      )}
                      alt={
                        (card.abstractImage.jsonValue?.value?.alt as string) ||
                        ''
                      }
                      width="560"
                      height="420"
                      quality={90}
                    />
                  ) : card.image?.jsonValue?.value?.src ? (
                    <Image
                      src={upsertQuerystringParam(
                        card.image?.jsonValue?.value?.src || '',
                        't',
                        'w750'
                      )}
                      alt={(card.image?.jsonValue?.value?.alt as string) || ''}
                      width="560"
                      height="420"
                      quality={90}
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

export const Default = WithImage;
