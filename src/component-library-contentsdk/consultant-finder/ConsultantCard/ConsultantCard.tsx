/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, type JSX } from 'react';
import Link from 'next/link';
import { ConsultantCardProps } from './ConsultantCard.types';
import styles from './ConsultantCard.module.scss';
import Text from '../../foundation/Text/Text';
import Reviews from '../Reviews/Reviews';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import TextButton from '../../core-components/TextButton/TextButton';
import TextLink from '../../core-components/TextLink/TextLink';
import InfoBox from '../InfoBox/InfoBox';
import ReadMore from '../ReadMore/ReadMore';
import { formatDateShort } from '../../utility-functions';
import Modals from '../../components/Modals/Modals';
import MultiplePhoneNumbers from '../MultiplePhoneNumbers/MultiplePhoneNumbers';

const ConsultantCard = (props: ConsultantCardProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ignoreReviews = (props.ignoreReviewsConsultantsList ?? []).includes(props.slug);

  // get specialties
  const specialties = props.keywords.filter(
    (item: any) => item.keywordType === 'specialty'
  );
  const specialtiesNames = specialties.map((item: any) => item.name).join(', ');

  // top specialty
  const topSpecialty = specialties.filter(
    (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
  );

  // Callback function to handle datalayer phone reveal tracking
  function callRevealTrack(): void {
    dialogRef?.current?.showModal();
    /* HWPD-3463 - data layer */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consultantFinder',
      goalType: 'callReveal',
      consultantName: props.name,
      consultantSpecialty: topSpecialty[0]?.name || '',
      consultantReviews: props.reviewsTotal || 0,
    });
  }

  return (
    <div className={styles['consultant-card']}>
      <Modals ref={dialogRef}>
        <MultiplePhoneNumbers
          practices={props.hospitals || []}
          title={props.callToBookModalTitle}
          defaultNumber={props.phoneNumberHref}
          doctifyPhoneSlugs={props.doctifyPhoneSlugs || []}
          slug={props.slug}
        ></MultiplePhoneNumbers>
      </Modals>
      <div className={styles['main-content']}>
        <div className={styles.header}>
          <div className={styles.photo}>
            <img
              src={props.profilePhoto}
              alt="consultant profile photo"
              width="105"
              height="105"
            />
          </div>
          <div className={styles['title-subspecialty']}>
            <TextLink>
              <Link href={`${props.viewProfileLink}${props.slug}`}>
                <Text tag="h2" variation="heading-2">
                  {props.name}
                </Text>
              </Link>
            </TextLink>

            {topSpecialty && topSpecialty[0]?.name && (
              <Text tag="h3" variation="subheading-2">
                {topSpecialty[0]?.name}
              </Text>
            )}
          </div>
        </div>
        {
          !ignoreReviews &&
          <div className={styles.reviews}>
            <Reviews
              reviewsTotal={ignoreReviews ? 0 : (props.reviewsTotal || 0)}
              reviewsCount={ignoreReviews ? 0 : (props.reviewsCount || 0)}
              isConsultantProfileReviews={false}
              hasTooltip={false}
              tooltipContent={'tooltip'}
              doctifyText={props.doctifyText}
              doctifyLogo={props.doctifyLogo}
              hasDoctifyBranding={true}
            />
          </div>
        }

        {props.hospitals && props.hospitals.length > 0 && (
          <div className={styles['list']}>
            <div className={styles['list-title']}>
              <Text tag="h3" variation="body-medium-small">
                {props.practicesTitle}
              </Text>
            </div>
            <div className={styles['list-content']}>
              <ReadMore
                showMoreText={props.showMoreText}
                showLessText={props.showLessText}
                iconShowLess={props.iconShowLess}
                iconShowMore={props.iconShowMore}
                tag="p"
                maxContent={3}
              >
                {props.hospitals.map(
                  (practice: any) =>
                    practice.slug !== 'video-consultation' && (
                      <Text key={practice.id} tag="p" variation="body-small">
                        {practice.name}
                      </Text>
                    )
                )}
              </ReadMore>
            </div>
          </div>
        )}
        {specialtiesNames && specialtiesNames.length > 0 && (
          <div className={styles['list']}>
            <div className={styles['list-title']}>
              <Text tag="h3" variation="body-medium-small">
                {props.treatmentsTitle}
              </Text>
            </div>
            <div className={styles['list-content']}>
              <Text tag="p" variation="body-small">
                {specialtiesNames}
              </Text>
            </div>
          </div>
        )}
      </div>
      {props.isLiveDiaryConsultant &&
        props.firstAppointment &&
        props.firstAppointment?.refreshedText != 'unavailable' && (
          <div className={styles.appointment}>
            <InfoBox
              backgroundColour="green"
              icon={null}
              isShortInfo={true}
              shortText={`${props.nextAppointmentTitle || 'Next appointment on'
                } ${formatDateShort(
                  props?.firstAppointment?.follow_appointment
                )}`}
            />
            <div className={styles.info}>
              <Text tag="p" variation="body-small">
                {props.lastUpdatedText} &nbsp;
                {props.loadingNextAppointmentText}
                {props.firstAppointment?.refreshedText}
              </Text>
            </div>
          </div>
        )}
      <div className={styles.buttons}>
        {!props.hideAppointmentRequest && !props.isLiveDiaryConsultant && (
          <div className={styles.button}>
            <Button
              variation="full-dark"
              size="large"
              contentVariation="full-width"
            >
              <Link
                href={`${props.enquireNowLink}?slug=${props.slug}&name=${encodeURIComponent(props.name || '')}&reviewsTotal=${props.reviewsTotal}`}
              >
                <span>{props.enquireNowCTAText}</span>
              </Link>
            </Button>
          </div>
        )}
        {props.isLiveDiaryConsultant && (
          <div className={styles.button}>
            <Button
              variation="full-dark"
              size="large"
              contentVariation="full-width"
            >
              <Link
                href={`${props.bookOnlineLink}?slug=${props.slug}&name=${encodeURIComponent(props.name || '')}&gmcNumber=${props.gmcNumber}&reviewsTotal=${props.reviewsTotal}&search=${topSpecialty[0]?.name || ''}&keywordId=${topSpecialty[0]?.id || ''}`}
              >
                <span>{props.bookNowCTAText}</span>
              </Link>
            </Button>
          </div>
        )}
        <div className={styles.button}>
          <Button
            variation="outline"
            size="small"
            contentVariation="full-width"
          >
            <button onClick={callRevealTrack}>
              {props.callToBookButtonIcon && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.callToBookButtonIcon,
                  }}
                ></span>
              )}
              {!props.callToBookButtonIcon && (
                <span>
                  <Icons iconName="iconPhone" />
                </span>
              )}
              <span>{props.callToBookButtonText}</span>
            </button>
          </Button>
        </div>
        <div className={styles['button-profile']}>
          <TextButton>
            <Link href={`${props.viewProfileLink}${props.slug}`}>
              {props.viewProfileCTAText}
              <Icons iconName="iconArrowSmallRight" />
            </Link>
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default ConsultantCard;
