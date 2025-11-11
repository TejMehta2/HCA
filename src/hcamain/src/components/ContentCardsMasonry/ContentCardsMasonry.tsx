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
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import MasonryCards, {
  MasonryCard,
} from '@component-library/site-components/MasonryCards/MasonryCards';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Button from '@component-library/core-components/Button/Button';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type MasonryCard = {
  rows: 1 | 2;
  columns: 3 | 6;
  headerDisplay: 'display-3' | 'display-6';
  showBodyCopy: boolean;
};

interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
  proxyurl?: { path?: string };
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

const ContentCardsMasonryDefaultComponent = (
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
          Content Cards Masonry. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: ContentCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields?.data?.item) {
    return <ContentCardsMasonryDefaultComponent {...props} />;
  }

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
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const layoutPattern = getMasonryCardsLayoutPattern(
    props.fields?.data?.item?.pages?.PagesList?.length || 0
  );

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
  return (
    <MasonryCards
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      title={
        <>
          <Text
            variation={props.params?.HeadingSize || 'display-3'}
            tag={headingTag}
          >
            <JssText
              tag={'span'}
              field={props.fields?.data?.item?.title?.jsonValue}
            />
          </Text>
        </>
      }
      subtitle={
        !isExperienceEditor ? (
          props.fields?.data?.item?.heading?.jsonValue?.value ? (
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
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
        props.fields?.data?.item?.text?.jsonValue || isExperienceEditor ? (
          <Text tag="div" variation="body-large">
            <JssRichText
              tag="div"
              field={props.fields?.data?.item?.text?.jsonValue}
            />
          </Text>
        ) : (
          <></>
        )
      }
      cta={
        link ? (
          <Button variation="full" size="large">
            {link}
          </Button>
        ) : (
          <></>
        )
      }
    >
      <>
        {props.fields?.data?.item?.pages?.PagesList?.slice(0, 5).map(
          (card, index) => {
            const cardCtaUrl = card?.proxyurl?.path
              ? card?.proxyurl?.path
              : card?.url?.path;

            return (
              <MasonryCard
                columns={layoutPattern[index].columns}
                rows={layoutPattern[index].rows}
                key={index}
                title={
                  <Text variation={layoutPattern[index].headerDisplay}>
                    {card.abstractTitle?.value ? (
                      <JssText field={card.abstractTitle} />
                    ) : (
                      <JssText field={card.title} />
                    )}
                  </Text>
                }
                cta={
                  cardCtaUrl ? (
                    <TextButton theme="light">
                      <a href={cardCtaUrl}>
                        <JssRichText
                          tag="div"
                          field={
                            props.fields?.data?.item?.cTACardText?.jsonValue
                          }
                        />
                      </a>
                    </TextButton>
                  ) : (
                    <></>
                  )
                }
                copy={
                  layoutPattern[index].showBodyCopy ? (
                    <Text variation="body-large">
                      {card.abstractText?.value ? (
                        <JssRichText tag="div" field={card.abstractText} />
                      ) : (
                        <JssRichText tag="div" field={card.text} />
                      )}
                    </Text>
                  ) : (
                    <></>
                  )
                }
                image={
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
                }
              />
            );
          }
        )}
      </>
    </MasonryCards>
  );
};

function getMasonryCardsLayoutPattern(cardsCount: number): MasonryCard[] {
  const cards: MasonryCard[] = [];

  //types of cards
  const largeVertical: MasonryCard = {
    columns: 6,
    rows: 2,
    headerDisplay: 'display-3',
    showBodyCopy: true,
  };
  const smallHorizontal: MasonryCard = {
    columns: 6,
    rows: 1,
    headerDisplay: 'display-6',
    showBodyCopy: false,
  };
  const smallVertical: MasonryCard = {
    columns: 3,
    rows: 1,
    headerDisplay: 'display-6',
    showBodyCopy: false,
  };

  //set pattern depending on number of cards
  if (cardsCount >= 0 && cardsCount <= 3) {
    cards.push(largeVertical, smallHorizontal, smallHorizontal);
  } else if (cardsCount === 4) {
    cards.push(largeVertical, smallHorizontal, smallVertical, smallVertical);
  } else if (cardsCount >= 5) {
    cards.push(
      largeVertical,
      smallVertical,
      smallVertical,
      smallVertical,
      smallVertical
    );
  }

  return cards;
}
