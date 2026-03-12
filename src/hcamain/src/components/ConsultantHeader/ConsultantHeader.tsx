import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import ProfilePageHeader from '@component-library/consultant-finder/ProfilePageHeader/ProfilePageHeader';

interface Fields {
  data?: {
    contextItem?: {
      title?: { jsonValue?: Field<string> };
      heading?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
    };
  };
}

export type ConsultantHeaderProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const ConsultantHeaderDefaultComponent = (
  props: ConsultantHeaderProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Consultant Header</span>
      </div>
    </div>
  );
};

export const Default = (props: ConsultantHeaderProps): JSX.Element => {
  const phKey = `consultant-header-${props.params?.DynamicPlaceholderId}`;

  if (!props.fields) {
    return <ConsultantHeaderDefaultComponent {...props} />;
  }

  const buttonSize: ButtonProps['size'] = 'large';
  const name =
    props.fields?.data?.contextItem?.title?.jsonValue?.value || '';
  const topSpecialty =
    props.fields?.data?.contextItem?.heading?.jsonValue?.value || '';
  const image =
    props.fields?.data?.contextItem?.image?.jsonValue?.value?.src || null;

  return (
    <div className={`component consultant-header ${props.params?.styles || ''}`}>
      <div className="component-content">
        <ProfilePageHeader
          name={name}
          topSpecialty={topSpecialty}
          image={image}
          infoBoxText=""
          overallExperienceYears={0}
          overallExperienceYearsText=""
        >
          {props.rendering && (
            <Placeholder
              name={phKey}
              rendering={props.rendering}
              size={buttonSize}
            />
          )}
        </ProfilePageHeader>
      </div>
    </div>
  );
};
