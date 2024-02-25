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
        <div className={styles.image}>
          <img src={props.image} alt="test" width="170" height="170" />
        </div>
        <div className={styles.details}>
          <div className={styles.speciality}>
            <Text tag="h2" variation="display-4">
              {props.name}
            </Text>
            <div className={styles['top-specialty']}>
              <Text tag="p" variation="subheading-2">
                {props.topSpecialty}
              </Text>
            </div>
          </div>
          <div className={styles['info-desktop']}>
            <InfoBox
              backgroundColour="beige"
              icon={<Icons iconName="iconStethoscope" />}
              isShortInfo={true}
              longText="If you`re experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
              longTextTitle=""
              shortText="Next initial appointment on Fri, Oct 28"
            />
          </div>
        </div>
      </div>
      <div className={styles['info-mobile']}>
        <InfoBox
          backgroundColour="orange"
          icon={null}
          isShortInfo={true}
          longText="If you`re experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
          longTextTitle=""
          shortText="Next initial appointment on Fri, Oct 28"
        />
      </div>
    </div>
  );
};

export default ProfilePageHeader;
