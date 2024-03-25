import React, { useContext } from 'react';
import { LocationCardProps } from './LocationCard.types';
import Text from '../../foundation/Text/Text';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import styles from './LocationCard.module.scss';

const LocationCard = (props: LocationCardProps): JSX.Element => {
  const { selectedLocation } = useContext(ConsultantFinderContext);
  return (
    <div className={styles.bold}>
      <div
        className={`${styles['location-card']}`}
        onClick={(e) => props.handleClick(e)}
        data-parent="parent"
      >
        <div className={styles.icon}>{props.icon}</div>
        <div className={styles.title}>
          <Text tag="h3" variation="body-medium-large">
            {props.title}
          </Text>
        </div>
        <div className={styles.description}>
          <Text tag="p" variation="body-medium-small">
            {props.text}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
