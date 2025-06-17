import React from 'react';
import { ProfilePageSectionProps } from './ProfilePageSection.types';
import styles from './ProfilePageSection.module.scss';

const ProfilePageSection = (
  props: ProfilePageSectionProps,
  ref: React.Ref<HTMLDivElement>
): JSX.Element => {
  const { children, noBottomBorder } = props;
  const className = !noBottomBorder
    ? styles.section
    : `${styles.section} ${styles['section-no-border-bottom']}`;
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default React.forwardRef(ProfilePageSection);
