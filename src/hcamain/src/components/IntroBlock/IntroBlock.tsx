import React from 'react';
import {
  Field,
  LinkField,
  Text as JSSText,
  RichText,
  Image as JSSImage,
  Link as JSSLink,
  ImageFieldValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HomepageIntroBlock from '@component-library/site-components/HomepageIntroBlock/HomepageIntroBlock';
import CQCBlock from '@component-library/components/CQCBlock/CQCBlock';
import Doctify from '@component-library/components/Doctify/Doctify';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import { IconName } from '@component-library/foundation/Icons/icon-map.generated';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface DoctifyLogoFields {
  fields: {
    Text: Field<string>;
    Logo: ImageFieldValue;
  };
}

interface CountersFields {
  fields: {
    Number: Field<string>;
    Text: Field<string>;
  };
}

interface CQCStatusFields {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    ReportLink: LinkField;
    Status: {
      fields: {
        ['CQC Logo']: {
          fields: {
            Logo: ImageFieldValue;
          };
        };
        Icon: { value: IconName };
      };
    };
  };
}

interface DoctifyReviewsFields {
  fields: {
    Stars: { value: number };
    Reviews: { value: string };
    DoctifyLogoLight: DoctifyLogoFields;
    DoctifyLogoDark: DoctifyLogoFields;
    Link: LinkField;
  };
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageFieldValue;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  Counters: CountersFields[];
  CQCStatus: CQCStatusFields;
  DoctifyReviews: DoctifyReviewsFields;
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

  const cqc = (
    <CQCBlock
      link={
        <JSSLink field={props.fields.CQCStatus.fields.ReportLink}></JSSLink>
      }
      title={props.fields.CQCStatus.fields.Title.value}
      text={props.fields.CQCStatus.fields.Text.value}
      icon={
        <Icons
          iconName={props.fields.CQCStatus.fields.Status.fields.Icon.value}
        ></Icons>
      }
      logo={{
        dark: (
          <JSSImage
            field={
              props.fields.CQCStatus.fields.Status.fields['CQC Logo'].fields
                .Logo
            }
          />
        ),
        light: (
          <JSSImage
            field={
              props.fields.CQCStatus.fields.Status.fields['CQC Logo'].fields
                .Logo
            }
          />
        ),
      }}
    />
  );

  const doctify = (
    <Doctify
      alignment="left"
      link={<JSSLink field={props.fields.DoctifyReviews.fields.Link}></JSSLink>}
      rating={props.fields.DoctifyReviews.fields.Stars.value}
      reviews={props.fields.DoctifyReviews.fields.Reviews.value}
      logo={{
        dark: (
          <JSSImage
            field={
              props.fields.DoctifyReviews.fields.DoctifyLogoDark.fields.Logo
            }
          />
        ),
        light: (
          <JSSImage
            field={
              props.fields.DoctifyReviews.fields.DoctifyLogoLight.fields.Logo
            }
          />
        ),
      }}
    />
  );

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
          <JSSLink field={props.fields.CTALink.value}></JSSLink>
        )
      }
      image={<JSSImage field={props.fields.Image} />}
      cqc={cqc}
      doctify={doctify}
    />
  );
};
