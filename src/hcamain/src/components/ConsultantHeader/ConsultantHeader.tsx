import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import HeaderProfile from '@component-library/site-components/HeaderProfile/HeaderProfile';
import Text from '@component-library/foundation/Text/Text';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

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

  return (
    <HeaderProfile
      ctas={
        props.rendering && (
          <Placeholder
            name={phKey}
            rendering={props.rendering}
            size={buttonSize}
          />
        )
      }
      department={
        <Text tag="p" variation="subheading-1">
          <JssText
            field={props.fields?.data?.contextItem?.heading?.jsonValue}
          />
        </Text>
      }
      image={
        <NextJssImage
          editable={false}
          field={props.fields?.data?.contextItem?.image?.jsonValue}
          next={{ width: 214, height: 214, quality: 90 }}
        />
      }
      theme={props.params?.Theme || 'Palace-Beige'}
      title={
        <Text tag="h1" variation="display-2">
          <JssText field={props.fields?.data?.contextItem?.title?.jsonValue} />
        </Text>
      }
    />
  );
};
