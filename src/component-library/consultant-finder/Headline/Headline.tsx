import React from 'react';
import { HeadlineProps } from './Headline.types';
import styles from './Headline.module.scss';
import ConsultantName from '../ConsultantName/ConsultantName';
import Icons from '../../foundation/Icons/Icons';
import TextButton from '../../core-components/TextButton/TextButton';
import Text from '../../foundation/Text/Text';
import Link from 'next/link';

const Headline = ({
  children,
  withConsultantName,
  name,
  slug,
  gmcNumber,
  reviewsTotal,
  backLink,
  backLinkText,
  headingText,
  slotsStep,
  backLinkProfile
}: HeadlineProps): JSX.Element => {

  const backHref = backLinkProfile
    ? backLinkProfile
    : `${backLink}?slug=${slug}&name=${encodeURIComponent(
      name || ''
    )}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}`;

  if (!withConsultantName) {
    // existing behavior
    return <div className={styles.headline}>{children}</div>;
  }

  // complex rendering
  return (
    <div
      className={`${styles['headline-with-name']} ${slotsStep ? styles['slots-headline'] : ''
        }`}
    >
      <div className={styles.back}>
        <TextButton>
          <Link
            href={backHref}
          >
            <Icons iconName="iconArrowSmallLeft" />
            <span>{backLinkText}</span>
          </Link>
        </TextButton>
      </div>
      <div className={styles.heading}>
        <Text tag="h1" variation="heading-1">
          {headingText}
        </Text>
      </div>
      {
        name &&
        <ConsultantName name={name || ''} variation={slotsStep ? 'light' : 'dark'}></ConsultantName>
      }
    </div>
  );
};

export default Headline;
