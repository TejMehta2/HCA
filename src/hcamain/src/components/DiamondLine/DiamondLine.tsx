import React from 'react';
import DiamondLine from '@component-library/site-components/DiamondLine/DiamondLine';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {}

type DiamondLineProps = {
  params: Params;
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
  return (
    <DiamondLine side="left" theme={props.params.Theme || 'H-HCA-Tangerine'} />
  );
};

export const RightAligned = (props: DiamondLineProps): JSX.Element => {
  if (!props.fields) {
    return <DiamondLineDefaultComponent {...props} />;
  }
  return <DiamondLine theme={props.params.Theme || 'H-HCA-Tangerine'} />;
};
