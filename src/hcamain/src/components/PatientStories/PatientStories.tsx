/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Link as JssLink,
  Field,
  Text as JssText,
  ImageField,
  RichText,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SideScrollingCards from '@component-library/site-components/SideScrollingCards/SideScrollingCards';
import CardPatientStories from '@component-library/components/CardPatientStories/CardPatientStories';
import Text from '@component-library/foundation/Text/Text';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Params from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

interface StoriesFields {
  title?: Field<string>;
  text?: Field<string>;
  date?: Field<string>;
  image?: { jsonValue?: ImageField };
  link?: LinkField;
  url?: { url?: string };
}

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cardCTAText?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      stories?: {
        StoriesList?: StoriesFields[];
      };
    };
  };
}

type PatientStoriesProps = {
  params?: Params;
  fields?: Fields;
};

const PatientStoriesDefaultComponent = (
  props: PatientStoriesProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Patient Stories please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Carousel = (props: PatientStoriesProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <PatientStoriesDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <CarouselCards
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      link={
        props.fields?.data?.item?.cTALink?.jsonValue && (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
            {props?.fields?.data?.item?.cTAIcon?.Icon && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value ||
                    '',
                }}
              />
            )}
            {!isExperienceEditor ? (
              <RichText
                tag="span"
                field={{
                  value:
                    props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
                }}
              />
            ) : (
              <></>
            )}
          </JssLink>
        )
      }
    >
      {props.fields?.data?.item?.stories?.StoriesList?.map((story, index) => (
        <CardPatientStories
          key={index}
          title={
            <Text
              tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
              variation="display-4"
            >
              <JssText field={story.title} />
            </Text>
          }
          link={
            <a href={story?.url?.url}>
              <RichText
                tag="span"
                field={{
                  value:
                    props.fields?.data?.item?.cardCTAText?.jsonValue?.value ||
                    '',
                }}
              />
            </a>
          }
          bodyCopy={
            <Text tag="div" variation="body-large">
              <RichText tag="span" field={story.text} />
            </Text>
          }
          image={
            <NextJssImage
              field={story?.image?.jsonValue}
              editable={false}
              next={{
                width: 500,
                height: 400,
                sizes: '(max-width: 768px) 100vw, 30vw',
              }}
            />
          }
          contentVariation="mixed"
        ></CardPatientStories>
      ))}
    </CarouselCards>
  );
};

export const Default = (props: PatientStoriesProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <PatientStoriesDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <SideScrollingCards
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      title={<JssText field={props.fields?.data?.item?.title?.jsonValue} />}
      link={
        props.fields?.data?.item?.cTALink?.jsonValue ? (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
            {props?.fields?.data?.item?.cTAIcon?.Icon && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value ||
                    '',
                }}
              />
            )}
            {!isExperienceEditor ? (
              <RichText
                tag="span"
                field={{
                  value:
                    props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
                }}
              />
            ) : (
              <></>
            )}
          </JssLink>
        ) : (
          <></>
        )
      }
      bodyCopy={
        <RichText
          tag="span"
          field={props.fields?.data?.item?.text?.jsonValue}
        />
      }
    >
      {props.fields?.data?.item?.stories?.StoriesList?.map((story, index) => (
        <CardPatientStories
          key={index}
          title={
            <Text tag="h3" variation="display-4">
              <JssText field={story.title} />
            </Text>
          }
          link={
            <a href={story?.url?.url}>
              <RichText
                tag="span"
                field={{
                  value:
                    props.fields?.data?.item?.cardCTAText?.jsonValue?.value,
                }}
              />
            </a>
          }
          bodyCopy={
            <Text tag="div" variation="body-large">
              <RichText tag="span" field={story?.text} />
            </Text>
          }
          image={
            <NextJssImage
              field={story?.image?.jsonValue}
              editable={false}
              next={{
                width: 500,
                height: 400,
                sizes: '(max-width: 768px) 100vw, 30vw',
              }}
            />
          }
          contentVariation="mixed"
        ></CardPatientStories>
      ))}
    </SideScrollingCards>
  );
};
