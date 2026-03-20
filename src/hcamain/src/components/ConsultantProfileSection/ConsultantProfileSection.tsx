import React from 'react';
import {
  Field,
  RichText as JssRichText,
  Text as JssText,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RichText from '@component-library/core-components/RichText/RichText';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import ProfilePageSection from '@component-library/consultant-finder/ProfilePageSection/ProfilePageSection';
import dataStyles from '@component-library/consultant-finder/DataComponentSimple/DataComponentSimple.module.scss';

interface Fields {
  Title?: Field<string>;
  Description?: Field<string>;
}

export type ConsultantProfileSectionProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const ConsultantProfileSectionDefaultComponent = (
  props: ConsultantProfileSectionProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Consultant Profile Section</span>
      </div>
    </div>
  );
};

export const Default = (props: ConsultantProfileSectionProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <ConsultantProfileSectionDefaultComponent {...props} />;
  }

  return (
    <ProfilePageSection>
      <div className={dataStyles.data}>
        {(props?.fields?.Title || isExperienceEditor) && (
          <div className={dataStyles.title}>
            <Text variation="subheading-1" tag="h3">
              <JssText field={props.fields.Title}></JssText>
            </Text>
          </div>
        )}
        {(props?.fields?.Description || isExperienceEditor) && (
          <div className={dataStyles.items}>
            <RichText>
              <JssRichText field={props.fields.Description} />
            </RichText>
          </div>
        )}
      </div>
    </ProfilePageSection>
  );
};
