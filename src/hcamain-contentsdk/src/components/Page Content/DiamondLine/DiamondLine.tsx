import React from 'react';
import DiamondLine from '@component-library/site-components/DiamondLine/DiamondLine';
import Params from 'src/types/params';

interface Fields {}

type DiamondLineProps = {
  params: Params;
  fields: Fields;
};

export const LeftAligned = (props: DiamondLineProps): JSX.Element => {
  return (
    <DiamondLine side="left" theme={props.params.Theme || 'H-HCA-Tangerine'} />
  );
};

export const RightAligned = (props: DiamondLineProps): JSX.Element => {
  return <DiamondLine theme={props.params.Theme || 'H-HCA-Tangerine'} />;
};
