/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  LinkField,
  Text as JSSText,
  RichText as JssRichText,
  Link as JssLink,
  ImageField,
  useSitecoreContext,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';

import { Default as Doctify } from '../Doctify/Doctify';
import { Default as CQCRating } from '../CQCRating/CQCRating';
import { CQSStatusFields } from 'components/CQCRating/CQCRating.types';
import { DoctifyReviewsFields } from 'components/Doctify/Doctify.types';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import dynamic from 'next/dynamic';
import RichText from '@component-library/core-components/RichText/RichText';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

const DynamicHomepageIntroBlock = dynamic(
  () =>
    import(
      '@component-library/site-components/HomepageIntroBlock/HomepageIntroBlock'
    ),
  {
    ssr: true,
  }
);

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};
export type logoField = {
  Logo?: ImageField;
};

interface CountersFields {
  fields?: {
    Number?: Field<string>;
    Text?: Field<string>;
  };
}

interface CQCFields {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    ReportLink?: LinkField | { url: string };
    Status?: CQSStatusFields;
  };
}

interface Fields {
  Title?: Field<string>;
  Headline?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
  CTAIcon?: HCAIconFields;
  CTALink: LinkField;
  Counters?: CountersFields[];
  CQCStatus?: CQCFields;
  DoctifyReviews?: DoctifyReviewsFields;
}

export type IntroBlockProps = {
  params?: Params;
  fields?: Fields;
  rendering?: ComponentRendering;
};

const IntroBlockDefaultComponent = (props: IntroBlockProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Intro Block. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

interface ImageLeftProps extends IntroBlockProps {
  imageAlignment: 'left' | 'right';
}

export const ImageLeft = (props: ImageLeftProps): JSX.Element => {
  const { imageAlignment = 'left' } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const phKey = `intro-block-${props.params?.DynamicPlaceholderId}`;

  const cta = isExperienceEditor ? (
    <JssLink field={props.fields?.CTALink}></JssLink>
  ) : props.fields?.CTALink && props.fields?.CTALink?.value?.text ? (
    <JssLink field={props.fields?.CTALink}>
      <SitecoreSvg>
        {props.fields?.CTAIcon?.fields?.SvgMarkup?.value}
      </SitecoreSvg>

      <JssRichText
        field={{
          value: props.fields?.CTALink?.value?.text,
        }}
      />
    </JssLink>
  ) : undefined;
  const stats = props.fields?.Counters?.map((counters) => ({
    value: <JSSText field={counters.fields?.Number} />,
    label: <JSSText field={counters.fields?.Text} />,
  }));
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Headline?.value
  );
  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';
  return (
    <DynamicHomepageIntroBlock
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      imageAlignment={imageAlignment}
      imageKeepAspectRatio={keepAspectRatio}
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={headingTag}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssRichText tag="span" field={props.fields?.Title} />
        </Text>
      }
      subtitle={
        props.fields?.Headline?.value ? (
          <Text tag={subheadingTag} variation={'subheading-2'}>
            <JSSText field={props.fields?.Headline} />
          </Text>
        ) : undefined
      }
      copy={
        <Text tag="div" variation="body-large">
          <RichText>
            <JssRichText field={props.fields?.Text} />
          </RichText>
        </Text>
      }
      stats={stats || []}
      cta={cta || <></>}
      image={
        <NextJssImage
          field={props.fields?.Image}
          editable={false}
          next={{
            width: 800,
            height: 1000,
            sizes: '(max-width: 768px) 100vw, 50vw',
          }}
        />
      }
      cqc={
        props.fields?.CQCStatus ? (
          <CQCRating
            length="short"
            hideRating={true}
            {...props.fields?.CQCStatus}
          />
        ) : (
          <></>
        )
      }
      doctify={
        props.fields?.DoctifyReviews?.fields ? (
          <Doctify
            alignment="left"
            params={props.params}
            key={2}
            fields={{ Reviews: props.fields?.DoctifyReviews }}
          />
        ) : (
          <></>
        )
      }
    >
      {props.rendering && (
        <PlaceHolderWrapper>
          <Placeholder name={phKey} rendering={props.rendering} />
        </PlaceHolderWrapper>
      )}
    </DynamicHomepageIntroBlock>
  );
};

export const ImageRight = (props: IntroBlockProps): JSX.Element => {
  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }
  return <ImageLeft {...props} imageAlignment="right" />;
};
