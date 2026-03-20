import React from 'react';
import {
  Field,
  RichText as JssRichText,
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RichText from '@component-library/core-components/RichText/RichText';
import Params from 'src/types/params';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import ProfilePageSection from '@component-library/consultant-finder/ProfilePageSection/ProfilePageSection';
import aboutStyles from '@component-library/consultant-finder/About/About.module.scss';
import Container from '@component-library/foundation/Containers/Container';

interface ProfileSection {
  fields?: {
    Title?: Field<string>;
    Description?: Field<string>;
  };
}

interface Fields {
  Profile?: Field<string>;
  ProfileSections?: ProfileSection[];
}

export type ConsultantProfileProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const ConsultantProfileDefaultComponent = (
  props: ConsultantProfileProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">
        Consultant Profile. Please click to select datasource.
      </span>
    </div>
  </div>
);

export const Default = (props: ConsultantProfileProps): JSX.Element => {
  const phKey = `consultant-profile-${props.params?.DynamicPlaceholderId}`;

  if (!props.fields) {
    return <ConsultantProfileDefaultComponent {...props} />;
  }

  const buttonSize: ButtonProps['size'] = 'large';

  const args = {
    marginTop: 'spacing-7',
    marginBottom: 'spacing-11',
    gridLayout: true,
  };

  return (
    <Container {...args}>
      {props.fields?.Profile && (
        <ProfilePageSection>
          <div className={aboutStyles.about}>
            <div className={aboutStyles.description}>
              <RichText>
                <JssRichText field={props.fields.Profile} />
              </RichText>
            </div>
          </div>
        </ProfilePageSection>
      )}

      {props.rendering && (
        <Placeholder
          name={phKey}
          rendering={props.rendering}
          size={buttonSize}
        />
      )}
    </Container>
  );
};
