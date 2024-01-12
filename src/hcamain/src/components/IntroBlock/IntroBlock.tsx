import React from 'react';
import {
  Field,
  LinkField,
  Text as JSSText,
  RichText,
  Image as JSSImage,
  Link as JSSLink,
  ImageFieldValue,
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
    Icon: { value: IconName };
    Logo: ImageFieldValue;
  };
}

interface DoctifyReviewsFields {
  fields: {
    Stars: { value: number };
    Reviews: { value: string };
    DoctifyLogo: DoctifyLogoFields;
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
  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }
  console.log(props);

  const stats = props.fields.Counters.map((counters) => ({
    value: <JSSText field={counters.fields.Number} />,
    label: <JSSText field={counters.fields.Text} />,
  }));

  const cqc = (
    <CQCBlock
      link={<a href="#"></a>}
      title={props.fields.CQCStatus.fields.Title.value}
      text="All our hospitals are rated Good or Oustanding."
      icon={<Icons iconName={props.fields.CQCStatus.fields.Icon.value}></Icons>}
      logo={{
        dark: <JSSImage field={props.fields.CQCStatus.fields.Logo} />,
        light: <JSSImage field={props.fields.CQCStatus.fields.Logo} />,
      }}
    />
  );

  /* dark: (
          <JSSImage
            field={props.fields.DoctifyReviews.fields.DoctifyLogo.fields.Logo}
          />
        ),
        light: (
          <JSSImage
            field={props.fields.DoctifyReviews.fields.DoctifyLogo.fields.Logo}
          />
        ), */

  const doctify = (
    <Doctify
      alignment="left"
      link={<a href="#"></a>}
      rating={props.fields.DoctifyReviews.fields.Stars.value}
      reviews={props.fields.DoctifyReviews.fields.Reviews.value}
      logo={{
        dark: <span></span>,
        light: <span></span>,
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
        <JSSLink field={props.fields.CTALink}>
          <RichText
            tag="span"
            field={{
              value: props.fields.CTALink.value.text,
            }}
          />
        </JSSLink>
      }
      image={<JSSImage field={props.fields.Image} />}
      cqc={cqc}
      doctify={doctify}
    />
  );
};

{
  /* <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <RichText field={props.fields.Text} />
      <Image field={props.fields.Image} />
      <br />
      <span>
        <b>Counters</b>
      </span>
      <br />
      <ul>
        {props.fields.Counters.map((counters, index) => (
          <li key={index}>
            <Text field={counters.fields.Text} />
            <br />
            <Text field={counters.fields.Number} />
          </li>
        ))}
      </ul>
      <br />
      {props?.fields?.CTAIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.CTAIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <Link field={props.fields.CTALink}></Link>
      <br />
      <span>
        <b>CQCStatus</b>
      </span>
      <br />
      <Text field={props.fields.CQCStatus.fields.Title} />
      <br />
      <Text field={props.fields.CQCStatus.fields.Icon} />
      <br />
      <Image field={props.fields.CQCStatus.fields.Logo} />
      <br />
      <span>
        <b>DoctifyReviews</b>
      </span>
      <br />
      <Text field={props.fields.DoctifyReviews.fields.Reviews} />
      <br />
      <Text field={props.fields.DoctifyReviews.fields.Stars} />
      <br />
      <Text
        field={props.fields.DoctifyReviews.fields.DoctifyLogo.fields.Text}
      />
      <br />
      <Image
        field={props.fields.DoctifyReviews.fields.DoctifyLogo.fields.Logo}
      />
      <br />
    </div> */
}
