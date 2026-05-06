import React, { type JSX } from 'react';
import { LocationCardProps } from './LocationCard.types';
import styles from './LocationCard.module.scss';
import Icons from '../../foundation/Icons/Icons';

const LocationCard = (props: LocationCardProps): JSX.Element => {
  const {
    name,
    description,
    children,
    selected,
    contentVariation,
    handleClick,
  } = props;
  return (
    <button
      className={[styles.wrapper, selected && styles.selected].join(' ')}
      onClick={(e) => handleClick(e)}
    >
      <div className={styles.container}>
        {name}
        {description}
        {children && <div className={styles.children}>{children}</div>}
      </div>
      {contentVariation === 'appointmentType' && (
        <div className={styles.icon}>
          <Icons iconName="iconArrowSmallRight" />
        </div>
      )}
    </button>
  );
};

export default LocationCard;
