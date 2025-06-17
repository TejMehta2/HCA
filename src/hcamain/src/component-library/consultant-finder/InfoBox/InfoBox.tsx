import React from 'react';
import { InfoBoxProps } from './InfoBox.types';
import styles from './InfoBox.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const InfoBox = (props: InfoBoxProps): JSX.Element => {
  const {
    icon,
    backgroundColour,
    isShortInfo,
    shortText,
    longText,
    longTextTitle,
    paddingLarge,
  } = props;
  return (
    <div
      className={`${styles['info-box']} ${
        styles[`info-box-${backgroundColour}`]
      } ${paddingLarge ? styles['padding-l'] : ''}`}
    >
      {isShortInfo && (
        <div className={`${styles['info-box-short']}`}>
          <span className={`${styles['info-box-icon']}`}>
            {!icon && <Icons iconName="iconClock" />}
            {icon && icon}
          </span>
          <Text tag="div" variation="body-medium-small">
            {shortText}
          </Text>
        </div>
      )}
      {!isShortInfo && (
        <div className={`${styles['info-box-long']}`}>
          <div className={`${styles['info-box-long-header']}`}>
            <span className={`${styles['info-box-icon']}`}>
              {!icon && <Icons iconName="iconStethoscope" />}
              {icon && icon}
            </span>
            <Text tag="h3" variation="subheading-1">
              {longTextTitle}
            </Text>
          </div>
          <div className={`${styles['info-box-long-text']}`}>
            <Text tag="div" variation="body-medium">
              {longText}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
