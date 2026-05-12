'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState, type JSX } from 'react';
import { SlotsCalendarProps } from './SlotsCalendar.types';
import styles from './SlotsCalendar.module.scss';
import {
  formatDateYYYYMMDD,
  formatDateLong,
  removeSeconds,
  formatTime12hr,
} from '../../utility-functions/index';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import LoaderCF from '../LoaderCF/LoaderCF';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import axios from 'axios';
import Headline from '../Headline/Headline';
import { isMobile } from '../../utility-functions/index';

const SlotsCalendar = (props: SlotsCalendarProps): JSX.Element => {
  const {
    locationGUID,
    selectedTypeOfAppointment,
    consultantGUID,
    fristAppointmentDate,
    setSelectedDate,
    setSelectedTime,
    setStartTime,
    setIsBookableContent
  } = useContext(ConsultantFinderContext);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<any>(null);
  const [, setLastDayOfWeek] = useState<any>(null);
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState(null);
  const [days, setDays] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [noSlots, setNoSlots] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(true);
  const [datesNotToBook, setDatesNotToBook] = useState<any>([]);
  //console.log(lastDayOfWeek);

  const getFirstDayOfWeek = (date: any) => {
    const firstDayOfWeek = new Date(date);
    const dayOfWeek = firstDayOfWeek.getDay();
    // check if day is Sunday, then get current week
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diff);
    return firstDayOfWeek;
  };

  const getLastDayOfWeek = (firstDayOfWeek: any) => {
    const lastDayOfWeek = new Date(
      firstDayOfWeek.getFullYear(),
      firstDayOfWeek.getMonth(),
      firstDayOfWeek.getDate() + 6
    );
    return lastDayOfWeek;
  };

  const getDates: any = (firstDayOfWeek: any, lastDayOfWeek: any) => {
    const dates = [];
    const currentDate: any = new Date(firstDayOfWeek);
    while (currentDate < lastDayOfWeek) {
      const options: object = { day: 'numeric', month: 'short' };
      const dateString = new Intl.DateTimeFormat('en-US', options).format(
        currentDate
      );
      dates.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
      setYear(currentDate.getFullYear());
    }
    // Add last day to the dates array
    const options: object = { day: 'numeric', month: 'short' };
    const dateString = new Intl.DateTimeFormat('en-US', options).format(
      lastDayOfWeek
    );
    dates.push(dateString);
    return dates;
  };

  const showNextWeek = () => {
    setLoadingSlots(true);
    const nextWeek = new Date(firstDayOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setFirstDayOfWeek(getFirstDayOfWeek(nextWeek));
    setLastDayOfWeek(getLastDayOfWeek(nextWeek));
    setDates(getDates(nextWeek, getLastDayOfWeek(nextWeek)));
    getSlots(
      formatDateYYYYMMDD(getFirstDayOfWeek(nextWeek)),
      formatDateYYYYMMDD(getLastDayOfWeek(nextWeek))
    );
  };

  const showPrevWeek = () => {
    setLoadingSlots(true);
    const prevWeek = new Date(firstDayOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setFirstDayOfWeek(getFirstDayOfWeek(prevWeek));
    setLastDayOfWeek(getLastDayOfWeek(prevWeek));
    setDates(getDates(prevWeek, getLastDayOfWeek(prevWeek)));
    getSlots(
      formatDateYYYYMMDD(getFirstDayOfWeek(prevWeek)),
      formatDateYYYYMMDD(getLastDayOfWeek(prevWeek))
    );
  };

  const getSlots = (firstDay: string, lastDay: string) => {
    setLoadingSlots(true);
    setDisablePrev(true);
    setDisableNext(true);
    setSelectedDate('');
    setSelectedTime('');
    setIsBookableContent(true);

    const slotsURL = `${props.API_C2_GetConsultantSlots_BaseURL}dateFrom=${firstDay}&dateTo=${lastDay}&isFollowOnAppointment=${selectedTypeOfAppointment}&consultantGUID=${consultantGUID}&locationGUID=${locationGUID}`;
    axios
      .get(slotsURL)
      .then((res) => {
        setLoadingSlots(false);

        const uniqueDates = [
          ...new Set(
            res?.data?.slots.map((slot: any) => slot.startTime.split('T')[0])
          ),
        ];

        const days: any = uniqueDates.map((date) => ({
          date: date,
          slots: res?.data?.slots
            .filter((slot: any) => slot.startTime.split('T')[0] === date)
            .map((slot: any) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
        }));

        // enable next/ prev after slots call was completed
        // prev also needs to check against first available date and remain disable if prev week will be before the week containing it
        setDisableNext(false);
        setDisablePrev(false);

        if (firstDay !== null) {
          const currentDate = new Date(fristAppointmentDate);
          currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
          const parsedFirstDayOfWeek = new Date(firstDay);
          parsedFirstDayOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight
          const lastDayOfPrevWeek = new Date(
            parsedFirstDayOfWeek.getTime() - 24 * 60 * 60 * 1000
          );

          // console.log('first day of the week', firstDayOfWeek);
          // console.log('current date', currentDate);
          // console.log('lastDayOfPrevWeek', lastDayOfPrevWeek);

          if (currentDate > lastDayOfPrevWeek) {
            setDisablePrev(true);
          } else {
            setDisablePrev(false);
          }
        }

        if (res?.data?.slots.length > 0) {
          setNoSlots(false);
          setDays(days);
        } else {
          setNoSlots(true);
          setDays([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingSlots(false);
        setDisablePrev(true);
        setDisableNext(true);
      });
  };

  const showSelection = (
    e: any,
    startTime: string,
    _endTime: string,
    formattedDate: string
  ) => {
    setSelectedDate(formatDateLong(startTime));
    setSelectedTime(formatTime12hr(startTime));
    setStartTime(startTime);
    // console.log(formatDateLong(startTime));
    // console.log(formatTime12hr(startTime));
    // console.log(endTime);
    const buttons = document.querySelectorAll('[data-button="slot-btn"]');

    if (buttons.length > 0) {
      buttons.forEach((btn) => {
        btn.classList.remove(styles.selected);
      });
    }

    e.target.closest('[data-button="slot-btn"]').classList.add(styles.selected);

    if (isBookableDate(formattedDate)) {
      setIsBookableContent(true);
    } else {
      setIsBookableContent(false);
    }

    if (!isMobile()) {
      props?.modalRef?.current?.showModal();
    }
  };


  ///// bookable logic /////
  const isBookableDate = (date: any) => {
    const currentDate = new Date(); // get current date
    currentDate.setHours(0, 0, 0, 0);
    // 2 business days including today
    const nextWorkingDay: any = nextWorkingDayInDaysTime(
      formatDateYYYYMMDD(currentDate),
      1
    );

    // if slot date is bigger than next working date then allow booking online
    return new Date(date) > new Date(nextWorkingDay);
  };

  const isWorkingDay = (inputDateString: any) => {
    const inputDate: any = new Date(inputDateString);
    // Not Sat Sun or a public holiday
    // TODO - Andy works Saturday mornings - do we need to factor this?
    return !(
      inputDate.getDay() === 0 ||
      inputDate.getDay() === 6 ||
      datesNotToBook.indexOf(inputDateString) > -1
    );
  };

  const nextWorkingDayInDaysTime = (inputDateString: any, days: any) => {
    let loopDate = new Date(inputDateString);
    let loopDayCount = days;
    while (loopDayCount > 0) {
      const newDate = loopDate.setDate(loopDate.getDate() + 1);
      loopDate = new Date(newDate);
      if (isWorkingDay(formatDateYYYYMMDD(loopDate))) {
        loopDayCount--;
      }
    }
    return loopDate;
  };

  useEffect(() => {
    setLoadingSlots(true);
    const firstDay: any = getFirstDayOfWeek(new Date(fristAppointmentDate));
    setFirstDayOfWeek(firstDay);
    const lastDay: any = getLastDayOfWeek(firstDay);
    setLastDayOfWeek(lastDay);
    // console.log('fristAppointmentDate', fristAppointmentDate);
    // console.log('firstDay', formatDateYYYYMMDD(firstDay));
    // console.log('lastDay', formatDateYYYYMMDD(lastDay));

    getSlots(formatDateYYYYMMDD(firstDay), formatDateYYYYMMDD(lastDay));

    setDates(getDates(firstDay, lastDay));

    if (props.holidays !== null && props.holidays !== undefined) {
      const holidaysUKData = props.holidays
        .map((item: any) => item.Values)
        .map((item: any) => item.ISODate);
      // console.log('holidaysUKData', holidaysUKData);
      setDatesNotToBook(holidaysUKData);
    } else {
      setDatesNotToBook([]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.slots}>
      <Headline
        withConsultantName={true}
        name={props.name}
        slug={props.slug}
        gmcNumber={props.gmcNumber}
        backLink={props.backLinkHref}
        backLinkText={props.backLinkText}
        headingText={props.titleText}
        slotsStep={true}
        reviewsTotal={props.reviewsTotal}
        resultsLink={props.resultsLink || '/finder/step-consultant-cards'}
        search={props.search}
        keywordId={props.keywordId}
      >
      </Headline>
      {/* {loadingSlots && <LoaderCF loadingMsg={'Loading slots...'} />}
      {!loadingSlots && <div>Slots loaded</div>} */}
      <div className={styles['header-mobile']}>
        <div className={`${styles['arrow']}`}>
          <button onClick={showPrevWeek} disabled={disablePrev}>
            <Icons iconName="iconChevronLeft" />
          </button>
        </div>
        <div>
          <Text tag="h2" variation="body-medium-medium">
            {props.chooseTimeHeading}
          </Text>
        </div>
        <div className={`${styles['arrow']}`}>
          <button onClick={showNextWeek} disabled={disableNext}>
            <Icons iconName="iconChevronRight" />
          </button>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles['header-container']}>
          <div className={`${styles['arrow']} ${styles.desktop}`}>
            <button onClick={showPrevWeek} disabled={disablePrev}>
              <Icons iconName="iconChevronLeft" />
            </button>
          </div>
          <div className={styles['week-header']}>
            {daysOfWeek.map((day, index) => (
              <div key={index} className={styles['week-header-item']}>
                <div className={styles.day}>
                  <Text tag="h2" variation="body-medium-small">
                    {day}
                  </Text>
                </div>
                <div className={styles.date}>
                  <Text tag="h3" variation="body-medium-large">
                    {dates[index]}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles['arrow']} ${styles.desktop}`}>
            <button onClick={showNextWeek} disabled={disableNext}>
              <Icons iconName="iconChevronRight" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles['slots-main']}>
        {loadingSlots && <LoaderCF loadingMsg={'Loading slots...'} />}
        {!loadingSlots && noSlots && (
          <div className={styles['no-slots']}>
            <Text tag="p" variation="body-medium-small">
              {props.API_C2_GetConsultantSlots_NoResultsMsg}
            </Text>
          </div>
        )}
        {!loadingSlots && days.length > 0 && (
          <div className={styles['weekdays']}>
            {daysOfWeek.map((_day, index) => (
              <div key={index} className={styles['weekdays-item']}>
                {days.map((date: any, dateIndex) => {
                  const getFormattedDate = (fristAppointmentDate: any) => {
                    const date = new Date(fristAppointmentDate);

                    const options: object = {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    };

                    const formattedDate = date.toLocaleDateString('en-US', {
                      ...options,
                      timeZone: 'UTC',
                    });

                    return formattedDate;
                  };

                  const newDate = getFormattedDate(date.date);

                  const formattedDate = `${dates[index]}, ${year}`;

                  if (newDate === formattedDate) {
                    return (
                      <div key={dateIndex} className={`${styles['time']}`}>
                        {date.slots.map(
                          (slot: any, slotIndex: any) =>
                            !slot.isBlocked && (
                              <button
                                data-button={'slot-btn'}
                                key={slotIndex}
                                className={`${!isBookableDate(formattedDate)
                                  ? `${styles['short-appointment']}`
                                  : ''
                                  }`}
                                onClick={(e) =>
                                  showSelection(
                                    e,
                                    slot.startTime,
                                    slot.endTime,
                                    formattedDate
                                  )
                                }
                              >
                                {!isBookableDate(formattedDate) &&
                                  // <Icons iconName="iconClock" />
                                  props.shortNoticeIcon}
                                <div className={styles['btn-txt']}>
                                  <Text
                                    tag="span"
                                    variation="body-medium-large"
                                  >
                                    {removeSeconds(
                                      new Date(
                                        slot.startTime
                                      ).toLocaleTimeString()
                                    )}
                                  </Text>
                                </div>
                              </button>
                            )
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.legend}>
        <div className={styles.col}>
          <div className={styles.dot}></div>
          <Text tag="h2" variation="body-medium-small">
            {props.keyBookOnlineText}
          </Text>
        </div>
        <div className={styles.col}>
          <div className={`${styles.dot} ${styles['dot-green']}`}></div>
          <Text tag="h2" variation="body-medium-small">
            {props.keyShortNoticeText}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SlotsCalendar;
