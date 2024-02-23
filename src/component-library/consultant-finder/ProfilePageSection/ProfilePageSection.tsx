import React from 'react';
import { ProfilePageSectionProps } from './ProfilePageSection.types';
import styles from './ProfilePageSection.module.scss';

const ProfilePageSection = (props: ProfilePageSectionProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.section}>{children}</div>;
};

export default ProfilePageSection;
