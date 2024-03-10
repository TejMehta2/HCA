import React from 'react';
import Link from 'next/link';
import { ConsultantCardProps } from './ConsultantCard.types';
import styles from './ConsultantCard.module.scss';
import Text from '../../foundation/Text/Text';
import Reviews from '../Reviews/Reviews';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import TextButton from '../../core-components/TextButton/TextButton';

const ConsultantCard = (props: ConsultantCardProps): JSX.Element => {
  return (
    <div className={styles['consultant-card']}>
      <div className={styles.header}>
        <div className={styles.photo}>
          <img src="" alt="consultant profile photo" width="105" height="105" />
        </div>
      </div>
      <div className={styles['title-subspecialty']}>
        <Text tag="h2" variation="heading-2">
          {props.name}
        </Text>
        <Text tag="h3" variation="subheading-2">
          {props.specialty}
        </Text>
      </div>
      <div className={styles.reviews}>
        <Reviews
          reviewsTotal={5}
          reviewsCount={props.reviewsCount}
          isConsultantProfileReviews={false}
          hasTooltip={false}
          tooltipContent={'tooltip'}
          doctifyText={'Reviewd By'}
          doctifyLogo={null}
          hasDoctifyBranding={true}
        />
      </div>
      <div className={styles['treatments-procedures']}>Treatments</div>
      <div className={styles.buttons}>
        <Button variation="full-dark" size="large">
          <Link href="/test">
            <span>
              <Icons iconName="iconPhone" />
            </span>
            <span>Button Text</span>
          </Link>
        </Button>
        <Button variation="full-dark" size="large">
          <Link href="/test">
            <span>
              <Icons iconName="iconPhone" />
            </span>
            <span>Button Text</span>
          </Link>
        </Button>
      </div>
      <div>
        <TextButton>
          <Link href="/test">
            View profile
            <Icons iconName="iconArrowSmallRight" />
          </Link>
        </TextButton>
      </div>
    </div>
  );
};

export default ConsultantCard;
