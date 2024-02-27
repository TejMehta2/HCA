import React, { useState } from 'react';
import { ReviewsSectionProps } from './ReviewsSection.types';
import styles from './ReviewsSection.module.scss';
import Tabs from '../../core-components/Tabs/Tabs';
import Themes from '../../foundation/Themes/Themes';
import PatientsReviews from './PatientReviews/PatientsReviews';
import PeerReviews from './PeerReviews/PeerReviews';

const ReviewsSection = (props: ReviewsSectionProps): JSX.Element => {
  const { children } = props;
  const [typeOfReviews, setTypeOfReviews] = useState<'patient' | 'peer'>(
    'patient'
  );

  const handleTabChange = (label: string) => {
    if (label === 'Patient Reviews') {
      setTypeOfReviews('patient');
    } else if (label === 'Peer Reviews') {
      setTypeOfReviews('peer');
    }
  };

  return (
    <div className={styles.bold}>
      <Themes theme={'F-HCA-White'}>
        <Tabs
          callback={handleTabChange}
          tabs={[
            {
              label: 'Patient Reviews',
            },
            {
              label: 'Peer Reviews',
            },
          ]}
        />
      </Themes>
      {typeOfReviews === 'patient' && <PatientsReviews></PatientsReviews>}
      {typeOfReviews === 'peer' && <PeerReviews></PeerReviews>}
    </div>
  );
};

export default ReviewsSection;
