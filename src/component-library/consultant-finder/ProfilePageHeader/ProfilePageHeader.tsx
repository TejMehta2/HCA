import React from 'react';
import { ProfilePageHeaderProps } from './ProfilePageHeader.types';
import styles from './ProfilePageHeader.module.scss';
import InfoBox from '../InfoBox/InfoBox';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const ProfilePageHeader = (props: ProfilePageHeaderProps): JSX.Element => {
  return (
    <div className={styles['profile-header']}>
      <div className={styles['profile-header-container']}>
        {props.image && (
          <div className={styles.image}>
            <img src={props.image} alt="test" width="170" height="170" />
          </div>
        )}
        <div className={styles.details}>
          <div className={styles.speciality}>
            <Text tag="h1" variation="display-4">
              {props.name}
            </Text>
            {props.topSpecialty !== '' && (
              <div className={styles['top-specialty']}>
                <Text tag="p" variation="subheading-2">
                  {props.topSpecialty}
                </Text>
              </div>
            )}
          </div>
          {props.overallExperienceYears > 0 && (
            <div className={styles['info-desktop']}>
              <InfoBox
                backgroundColour="beige"
                icon={<Icons iconName="iconStethoscope" />}
                isShortInfo={true}
                shortText={`${props.overallExperienceYears} ${props.overallExperienceYearsText}`}
              />
            </div>
          )}
        </div>
      </div>
      {props.overallExperienceYears > 0 && (
        <div className={styles['info-mobile']}>
          <InfoBox
            backgroundColour="beige"
            icon={<Icons iconName="iconStethoscope" />}
            isShortInfo={true}
            shortText={`${props.overallExperienceYears} ${props.overallExperienceYearsText}`}
          />
        </div>
      )}
      <div className={styles.tabs}>{props.children}</div>
    </div>
  );
};

export default ProfilePageHeader;
