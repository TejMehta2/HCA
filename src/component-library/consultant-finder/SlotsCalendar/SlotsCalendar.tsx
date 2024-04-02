/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { SlotsCalendarProps } from './SlotsCalendar.types';
import styles from './SlotsCalendar.module.scss';
import {
  formatDateYYYYMMDD,
  formatDateLong,
  removeSeconds,
  formatTime12hr,
} from '../../utility-functions/index';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import LoaderCF from '../LoaderCF/LoaderCF';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import axios from 'axios';
import TextLink from '../../core-components/TextLink/TextLink';

const SlotsCalendar = (props: SlotsCalendarProps): JSX.Element => {
  const { children } = props;
  const {
    selectedLocationName,
    locationGUID,
    selectedTypeOfAppointment,
    consultantGUID,
    fristAppointmentDate,
    lat,
    lon,
    setSelectedDate,
    setSelectedTime,
  } = useContext(ConsultantFinderContext);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<any>(null);
  // eslint-disable-next-line
  const [lastDayOfWeek, setLastDayOfWeek] = useState<any>(null);
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState(null);
  const [days, setDays] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [noSlots, setNoSlots] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(true);
  const [datesNotToBook, setDatesNotToBook] = useState<any>([]);
  const [isBookableContent, setIsBookableContent] = useState(true);

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
    console.log('next');
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
    console.log('prev');
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

    const slotsURL = `https:/api/C2/GetLDBConsultantSlots?dateFrom=${firstDay}&dateTo=${lastDay}&isFollowOnAppointment=${selectedTypeOfAppointment}&consultantGUID=${consultantGUID}&locationGUID=${locationGUID}`;
    axios
      .get(slotsURL)
      .then((res) => {
        setLoadingSlots(false);
        console.log('slots', res);

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

        console.log('formatted slots api', days);

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

          console.log('first day of the week', firstDayOfWeek);
          console.log('current date', currentDate);
          console.log('lastDayOfPrevWeek', lastDayOfPrevWeek);

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

  const showSelection = (e, startTime, endTime, formattedDate) => {
    setSelectedDate(formatDateLong(startTime));
    setSelectedTime(formatTime12hr(startTime));
    console.log(formatDateLong(startTime));
    console.log(formatTime12hr(startTime));

    if (isBookableDate(formattedDate)) {
      setIsBookableContent(true);
    } else {
      setIsBookableContent(false);
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
    // Not Sun, Sat or a public holiday
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
    console.log('fristAppointmentDate', fristAppointmentDate);
    console.log('firstDay', formatDateYYYYMMDD(firstDay));
    console.log('lastDay', formatDateYYYYMMDD(lastDay));

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
      <div className={styles.top}>
        <Text tag="h1" variation="heading-1">
          Please select a slot
        </Text>
        <div className={styles.location}>
          <Text tag="h2" variation="body-medium-extra-large">
            {selectedLocationName}
          </Text>
          {lat !== '' && lon !== '' && (
            <div className={styles.map}>
              <TextLink>
                <a
                  href={`https://maps.google.com/?q=${lat},${lon}`}
                  target="_blank"
                >
                  <Icons iconName="iconPin" />
                  <span>View location on Google Maps</span>
                </a>
              </TextLink>
            </div>
          )}
        </div>
      </div>
      {/* {loadingSlots && <LoaderCF loadingMsg={'Loading slots...'} />}
      {!loadingSlots && <div>Slots loaded</div>} */}
      <div className={styles.header}>
        <div className={styles['header-container']}>
          <div className={styles['arrow']}>
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
                <div className="date">
                  <Text tag="h3" variation="body-medium-large">
                    {dates[index]}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className={styles['arrow']}>
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
            <p>No slots</p>
          </div>
        )}
        {!loadingSlots && days.length > 0 && (
          <div className={styles['weekdays']}>
            {daysOfWeek.map((day, index) => (
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
                                key={slotIndex}
                                className={`${
                                  !isBookableDate(formattedDate)
                                    ? 'short-appointment'
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
                                {/* {!isBookableDate(formattedDate) && (
                              <span
                                className="time--not-bookable-icon"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <svg
                                  width="18"
                                  height="19"
                                  viewBox="0 0 18 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.329 2.09861V5.02255H12.4051M8.89637 17.5955C7.54762 17.5954 6.22139 17.2497 5.04418 16.5915C3.86696 15.9332 2.87802 14.9843 2.17166 13.8354C1.46531 12.6864 1.06511 11.3756 1.00922 10.028C0.953337 8.68038 1.24363 7.34094 1.85243 6.1374C2.46122 4.93387 3.3682 3.90638 4.48687 3.15292C5.60555 2.39947 6.8986 1.94518 8.24271 1.83338C9.58681 1.72159 10.9371 1.95601 12.1649 2.5143C13.3927 3.07259 14.457 3.93613 15.2562 5.02255M12.1649 16.8125C11.5237 17.1651 11.3644 17.2379 10.6507 17.3999M14.7656 14.7188C14.3691 15.2568 14.3869 15.23 13.8688 15.6521M16.4375 12.0438C16.3144 12.4406 16.3094 12.5339 16.125 12.9062"
                                    stroke="#34787F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.0625 12.8125L8.25 10.5957V5.625"
                                    stroke="#34787F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )} */}
                                <Text tag="span" variation="body-medium-large">
                                  {removeSeconds(
                                    new Date(
                                      slot.startTime
                                    ).toLocaleTimeString()
                                  )}
                                </Text>
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
    </div>
  );
};

export default SlotsCalendar;
