import React from 'react';
import {
  Field,
  LinkField,
  Text as JSSText,
  RichText,
  Image as JSSImage,
  Link as JSSLink,
  ImageField,
  ImageFieldValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HomepageIntroBlock from '@component-library/site-components/HomepageIntroBlock/HomepageIntroBlock';
import Text from '@component-library/foundation/Text/Text';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

import { Default as Doctify } from '../Doctify/Doctify';
import { Default as CQCRating } from '../CQCRating/CQCRating';
import { CQSStatusFields } from 'components/CQCRating/CQCRating.types';
import { DoctifyReviewsFields } from 'components/Doctify/Doctify.types';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};
export type logoField = {
  Logo: ImageField;
};

interface CountersFields {
  fields: {
    Number: Field<string>;
    Text: Field<string>;
  };
}

interface CQCFields {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    ReportLink: LinkField;
    Status: CQSStatusFields;
  };
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageFieldValue;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  Counters: CountersFields[];
  CQCStatus?: CQCFields;
  DoctifyReviews?: DoctifyReviewsFields;
}

type IntroBlockProps = {
  params: {
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
    styles: string;
  };
  fields: Fields;
};

const IntroBlockDefaultComponent = (props: IntroBlockProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Intro Block no datasource</span>
    </div>
  </div>
);

export const Default = (props: IntroBlockProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }

  const stats = props.fields.Counters.map((counters) => ({
    value: <JSSText field={counters.fields.Number} />,
    label: <JSSText field={counters.fields.Text} />,
  }));
  return (
    <HomepageIntroBlock
      title={
        <Text
          tag={props.params.HeadingTag || 'h2'}
          variation={props.params.HeadingSize || 'display-1'}
        >
          <JSSText field={props.fields.Title} />
        </Text>
      }
      copy={
        <Text tag="span" variation="body-large">
          <RichText tag="p" field={props.fields.Text} />
        </Text>
      }
      stats={stats}
      cta={
        !isExperienceEditor ? (
          <JSSLink field={props.fields.CTALink}>
            <RichText
              tag="span"
              field={{
                value: props.fields.CTALink.value.text,
              }}
            />
          </JSSLink>
        ) : (
          <JSSLink field={props.fields.CTALink}></JSSLink>
        )
      }
      image={<JSSImage field={props.fields.Image} />}
      cqc={
        props.fields.CQCStatus ? (
          <CQCRating
            length="short"
            hideRating={true}
            {...props.fields.CQCStatus}
          />
        ) : (
          <></>
        )
      }
      doctify={
        props.fields.DoctifyReviews?.fields ? (
          <Doctify
            alignment="left"
            params={props.params}
            key={2}
            fields={{ Reviews: props.fields.DoctifyReviews }}
          />
        ) : (
          <></>
        )
      }
    />
  );
};
