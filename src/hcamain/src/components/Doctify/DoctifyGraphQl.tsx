import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Doctify from '@component-library/components/Doctify/Doctify';
import { DoctifyPropsGraphQl } from './DoctifyGraphQl.types';

const DoctifyDefaultComponent = (props: DoctifyPropsGraphQl): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Doctify. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: DoctifyPropsGraphQl): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields?.data?.item) {
    return <DoctifyDefaultComponent {...props} />;
  }

  const reviews = props.fields?.data?.item?.Reviews;

  const doctifyLink = reviews?.targetItem?.link?.jsonValue?.value?.href ? (
    <a href={reviews?.targetItem?.link.jsonValue.value.href}></a>
  ) : (
    reviews?.targetItem?.link && (
      <JssLink field={reviews?.targetItem?.link}></JssLink>
    )
  );

  const lightLogo =
    reviews?.targetItem?.doctifyLogoLight?.targetItem?.logo?.jsonValue;
  const darkLogo =
    reviews?.targetItem?.doctifyLogoDark?.targetItem?.logo?.jsonValue;

  return (
    <div
      className={`component ${props.params?.styles}`}
      component-name="doctify"
    >
      <Doctify
        alignment={props.alignment}
        link={doctifyLink}
        rating={
          isExperienceEditor ? (
            <JssText field={reviews?.targetItem?.stars} />
          ) : (
            reviews?.targetItem?.stars?.value || <></>
          )
        }
        reviews={<JssText field={reviews?.targetItem?.reviews} />}
        logo={{
          dark: <JssImage field={darkLogo} width="83" height="21" />,
          light: <JssImage field={lightLogo} width="83" height="21" />,
        }}
      ></Doctify>
    </div>
  );
};
