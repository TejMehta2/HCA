import React from 'react';
import DiamondLine from '@component-library/site-components/DiamondLine/DiamondLine';
import Params from 'src/types/params';

interface Fields {}

type DiamondLineProps = {
  params: Params;
  fields: Fields;
};

const DiamondLineDefaultComponent = (props: DiamondLineProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">DiamondLine no datasource</span>
    </div>
  </div>
);

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
