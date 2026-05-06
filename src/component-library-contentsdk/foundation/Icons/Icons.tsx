import React, { type JSX } from 'react';
import { IconsProps } from './Icons.types';
import iconMap from './icon-map.generated';

const Icons = (props: IconsProps): JSX.Element => {
  const { iconName } = props;
  const SvgIcon = iconMap.get(iconName) as () => JSX.Element;
  return <SvgIcon />;
};

export default Icons;
