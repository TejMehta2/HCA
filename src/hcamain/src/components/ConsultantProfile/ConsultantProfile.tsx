import React from 'react';
import {
  Field,
  RichText as JssRichText,
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RichText from '@component-library/core-components/RichText/RichText';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import ProfilePageSection from '@component-library/consultant-finder/ProfilePageSection/ProfilePageSection';
import dataStyles from '@component-library/consultant-finder/DataComponentSimple/DataComponentSimple.module.scss';
import aboutStyles from '@component-library/consultant-finder/About/About.module.scss';

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
  const phKey = `consultant-header-${props.params?.DynamicPlaceholderId}`;

  if (!props.fields) {
    return <ConsultantProfileDefaultComponent {...props} />;
  }

  const buttonSize: ButtonProps['size'] = 'large';

  return (
    <div className={`component consultant-profile ${props.params?.styles || ''}`}>
      <div className="component-content">
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
        {props.fields?.ProfileSections &&
          props.fields.ProfileSections.length > 0 &&
          props.fields.ProfileSections.map((section, index) => (
            <ProfilePageSection key={index}>
              <div className={dataStyles.data}>
                {section?.fields?.Title?.value && (
                  <div className={dataStyles.title}>
                    <Text variation="subheading-1" tag="h3">
                      {section.fields.Title.value}
                    </Text>
                  </div>
                )}
                {section?.fields?.Description && (
                  <div className={dataStyles.items}>
                    <RichText>
                      <JssRichText field={section.fields.Description} />
                    </RichText>
                  </div>
                )}
              </div>
            </ProfilePageSection>
          ))}
        {props.rendering && (
          <Placeholder
            name={phKey}
            rendering={props.rendering}
            size={buttonSize}
          />
        )}
      </div>
    </div>
  );
};
