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
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Timeline, {
  TimelineStep,
} from '@component-library/site-components/Timeline/Timeline';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import Themes from '@component-library/foundation/Themes/Themes';
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

export type TimelineProps = {
  params?: Params;
  fields?: Fields;
  dataSource: string;
};

const TimelineDefaultComponent = (props: TimelineProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Timeline. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: TimelineProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields?.data?.item) {
    return <TimelineDefaultComponent {...props} />;
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
    <>
      <Themes theme={props?.params?.Theme || 'A-HCA-White'} tableOfContentTitle={tableOfContentTitle}>
        <Timeline
          id={componentAnchorId}
          subheading={
            !isExperienceEditor ||
              props.fields?.data?.item?.heading?.jsonValue?.value ? (
              <Text tag={subheadingTag} variation={'subheading-1'}>
                <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
              </Text>
            ) : (
              <></>
            )
          }
          heading={
            <Text
              variation={props.params?.HeadingSize || 'display-3'}
              tag={headingTag}
            >
              <JssText
                tag={'span'}
                field={props.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
          }
          ctas={link ? <TextLink>{link}</TextLink> : undefined}
          copy={
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
        >
          <>
            {props.fields?.data?.item?.pages?.PagesList?.map((card, index) => {
              const cardCtaUrl = card?.proxyurl?.path
                ? card?.proxyurl?.path
                : card?.url?.path;
              return (
                <TimelineStep
                  key={index}
                  index={
                    <Text variation="display-5">
                      {(index + 1).toString().padStart(2, '0')}
                    </Text>
                  }
                  heading={
                    <Text variation="display-5">
                      {card.abstractTitle?.value ? (
                        <JssText field={card.abstractTitle} />
                      ) : (
                        <JssText field={card.title} />
                      )}
                    </Text>
                  }
                  copy={
                    <Text variation="body-large">
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
                          tag="div"
                          field={
                            props.fields?.data?.item?.cTACardText?.jsonValue
                          }
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
        </Timeline>
      </Themes>
    </>
  );
};
