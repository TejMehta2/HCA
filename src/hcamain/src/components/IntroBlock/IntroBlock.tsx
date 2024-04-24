import React from 'react';
import {
  Field,
  LinkField,
  Text as JSSText,
  RichText,
  Image as JSSImage,
  Link as JssLink,
  ImageField,
  ImageFieldValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HomepageIntroBlock from '@component-library/site-components/HomepageIntroBlock/HomepageIntroBlock';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';

import { Default as Doctify } from '../Doctify/Doctify';
import { Default as CQCRating } from '../CQCRating/CQCRating';
import { CQSStatusFields } from 'components/CQCRating/CQCRating.types';
import { DoctifyReviewsFields } from 'components/Doctify/Doctify.types';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';

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
  Text?: Field<string>;
  Image?: ImageFieldValue;
  CTAIcon?: HCAIconFields;
  CTALink?: LinkField;
  Counters?: CountersFields[];
  CQCStatus?: CQCFields;
  DoctifyReviews?: DoctifyReviewsFields;
}

type IntroBlockProps = {
  params?: Params;
  fields?: Fields;
};

const IntroBlockDefaultComponent = (props: IntroBlockProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Intro Block no datasource</span>
    </div>
  </div>
);

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

  const cta =
    props.fields?.CTALink &&
    (isExperienceEditor ? (
      <JssLink field={props.fields?.CTALink?.value}></JssLink>
    ) : (
      <JssLink field={props.fields?.CTALink}>
        <SitecoreSvg>
          {props.fields?.CTAIcon?.fields?.SvgMarkup?.value}
        </SitecoreSvg>
        <RichText
          field={{
            value: props.fields?.CTALink?.value?.text,
          }}
        />
      </JssLink>
    ));
  const stats = props.fields?.Counters?.map((counters) => ({
    value: <JSSText field={counters.fields?.Number} />,
    label: <JSSText field={counters.fields?.Text} />,
  }));
  return (
    <HomepageIntroBlock
      imageAlignment={imageAlignment}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-1'}
        >
          <JSSText field={props.fields?.Title} />
        </Text>
      }
      copy={
        <Text tag="div" variation="body-large">
          <RichText field={props.fields?.Text} />
        </Text>
      }
      stats={stats || []}
      cta={cta || <></>}
      image={<JSSImage field={props.fields?.Image} />}
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
    />
  );
};

export const ImageRight = (props: IntroBlockProps): JSX.Element => {
  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }
  return <ImageLeft {...props} imageAlignment="right" />;
};
