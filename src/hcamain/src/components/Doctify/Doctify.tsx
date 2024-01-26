import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Doctify from '@component-library/components/Doctify/Doctify';

interface DoctifyLogoFields {
  fields: {
    Text: Field<string>;
    Logo: ImageField;
  };
}

interface DoctifyReviewsFields {
  fields: {
    Stars: Field<string>;
    Reviews: Field<string>;
    DoctifyLogoLight: DoctifyLogoFields;
    DoctifyLogoDark: DoctifyLogoFields;
    Link: LinkField;
  };
}

interface Fields {
  Reviews: DoctifyReviewsFields;
}

type DoctifyProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DoctifyDefaultComponent = (props: DoctifyProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Doctify no datasource</span>
    </div>
  </div>
);

export const Default = (props: DoctifyProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <DoctifyDefaultComponent {...props} />;
  }

  return (
    <div
      className={`component ${props.params.styles}`}
      component-name="doctify"
    >
      <Doctify
        link={<JssLink field={props.fields.Reviews.fields.Link}></JssLink>}
        rating={
          isExperienceEditor ? (
            <JssText field={props.fields.Reviews.fields.Stars} />
          ) : (
            props.fields.Reviews.fields.Stars.value
          )
        }
        reviews={<JssText field={props.fields.Reviews.fields.Reviews} />}
        logo={{
          dark: (
            <JssImage
              field={props.fields.Reviews.fields.DoctifyLogoDark?.fields.Logo}
              width="83"
              height="21"
            />
          ),
          light: (
            <JssImage
              field={props.fields.Reviews.fields.DoctifyLogoLight?.fields.Logo}
              width="83"
              height="21"
            />
          ),
        }}
      ></Doctify>
    </div>
  );
};
