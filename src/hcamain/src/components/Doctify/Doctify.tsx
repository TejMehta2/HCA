import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Doctify from '@component-library/components/Doctify/Doctify';
import { DoctifyProps } from './Doctify.types';

const DoctifyDefaultComponent = (props: DoctifyProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
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

  const lightLogo = props.fields?.Reviews?.fields?.DoctifyLogoLight?.fields
    ?.Logo.fields
    ? props.fields?.Reviews?.fields?.DoctifyLogoLight?.fields?.Logo.fields
    : props.fields?.Reviews?.fields?.DoctifyLogoLight?.fields?.Logo;

  const darkLogo = props.fields?.Reviews?.fields?.DoctifyLogoDark?.fields?.Logo
    .fields
    ? props.fields?.Reviews?.fields?.DoctifyLogoDark?.fields?.Logo.fields
    : props.fields?.Reviews?.fields?.DoctifyLogoDark?.fields?.Logo;

  return (
    <div
      className={`component ${props.params?.styles}`}
      component-name="doctify"
    >
      <Doctify
        alignment={props.alignment}
        link={
          props.fields?.Reviews?.fields?.Link && (
            <JssLink field={props.fields?.Reviews?.fields?.Link}></JssLink>
          )
        }
        rating={
          isExperienceEditor ? (
            <JssText field={props.fields?.Reviews?.fields?.Stars} />
          ) : (
            props.fields?.Reviews?.fields?.Stars?.value || <></>
          )
        }
        reviews={<JssText field={props.fields?.Reviews?.fields?.Reviews} />}
        logo={{
          dark: <JssImage field={darkLogo} width="83" height="21" />,
          light: <JssImage field={lightLogo} width="83" height="21" />,
        }}
      ></Doctify>
    </div>
  );
};
