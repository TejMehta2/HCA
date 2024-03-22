import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {}

type DiamondLineProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DiamondLineDefaultComponent = (props: DiamondLineProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component ${props.params.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">DiamondLine no datasource</span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const LeftAligned = (props: DiamondLineProps): JSX.Element => {
  if (!props.fields) {
    return <DiamondLineDefaultComponent {...props} />;
  }
  return <div className={`component ${props.params.styles}`}></div>;
};

export const RightAligned = (props: DiamondLineProps): JSX.Element => {
  if (!props.fields) {
    return <DiamondLineDefaultComponent {...props} />;
  }
  return <div className={`component ${props.params.styles}`}></div>;
};
