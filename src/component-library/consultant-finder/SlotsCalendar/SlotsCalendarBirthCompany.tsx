/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { SlotsCalendarBirthCompanyProps } from './SlotsCalendarBirthCompany.types';
import styles from './SlotsCalendar.module.scss';
import {
  formatDateYYYYMMDD,
  formatDateLong,
  removeSeconds,
  formatTime12hr,
} from '../../utility-functions/index';
import { TheBirthCompanyContext } from '../../../hcamain/src/context/theBirthCompanyContext';
import LoaderCF from '../LoaderCF/LoaderCF';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import axios from 'axios';
import TextLink from '../../core-components/TextLink/TextLink';

const SlotsCalendarBirthCompany = (
  props: SlotsCalendarBirthCompanyProps
): JSX.Element => {
  const {
    selectedLocationName,
    selectedLocation,
    selectedTypeOfAppointment,
    selectedScanId,
    selectedExtras,
    firstAppointmentDate,
    lat,
    lon,
    setSelectedDate,
    setSelectedTime,
    setStartTime,
    setIsBookableContent,
    setSelectedSlotId,
  } = useContext(TheBirthCompanyContext);
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

  function cleanTimestamp(ts: string): string {
    return ts.split('|')[0]; // Removes everything after "|"
  }

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

  function getWeekDates(dateStr: string): { [key: string]: string } {
    const date = new Date(dateStr);
    const week: { [key: string]: string } = {};

    // Get the current day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = date.getDay();

    // Calculate the difference to get to Monday (if Sunday, move back 6 days)
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    // Start from Monday and fill in the week
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + diffToMonday + i);

      const options: object = { day: 'numeric', month: 'short' };
      const dateString = new Intl.DateTimeFormat('en-US', options).format(
        newDate
      );

      week[daysOfWeek[i]] = dateString; // Format: "Mar 24"
    }

    return week;
  }

  const getDates: any = (firstDayOfWeek) => {
    const weekOfDates = getWeekDates(firstDayOfWeek);
    return weekOfDates;
  };

  const showNextWeek = () => {
    setLoadingSlots(true);
    const nextWeek = new Date(firstDayOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setFirstDayOfWeek(getFirstDayOfWeek(nextWeek));
    setLastDayOfWeek(getLastDayOfWeek(nextWeek));
    getSlots(formatDateYYYYMMDD(getFirstDayOfWeek(nextWeek)));
  };

  const showPrevWeek = () => {
    setLoadingSlots(true);
    const prevWeek = new Date(firstDayOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setFirstDayOfWeek(getFirstDayOfWeek(prevWeek));
    setLastDayOfWeek(getLastDayOfWeek(prevWeek));
    getSlots(formatDateYYYYMMDD(getFirstDayOfWeek(prevWeek)));
  };

  const getSlots = (firstDay?: string) => {
    setLoadingSlots(true);
    setDisablePrev(true);
    setDisableNext(true);
    setSelectedDate('');
    setSelectedTime('');
    setIsBookableContent(true);

    const fromDate = formatDateYYYYMMDD(firstDay) || '';

    function formatQueryParams(ids: string[]): string {
      const extrasString = ids
        .map((id) => `extraId=${encodeURIComponent(id)}`)
        .join('&');
      return `&${extrasString}`;
    }
    const extras = selectedExtras.length
      ? formatQueryParams(selectedExtras)
      : '';

    const slotsURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/calendar?scanId=${selectedScanId}&locationId=${selectedLocation}&typeId=${selectedTypeOfAppointment}&from=${fromDate}${extras}`;

    console.log(slotsURL);
    if (
      selectedLocation === '' ||
      selectedScanId === '' ||
      selectedTypeOfAppointment === ''
    ) {
      return;
    }

    axios
      .get(slotsURL)
      .then((res) => {
        console.log(res);
        setLoadingSlots(false);

        const daysData = res?.data?.days;

        setDates(getDates(firstDay));

        // enable next/ prev after slots call was completed
        // prev also needs to check against first available date and remain disable if prev week will be before the week containing it
        setDisableNext(false);
        setDisablePrev(false);

        if (firstDay) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
          const parsedFirstDayOfWeek = new Date(firstDay);
          parsedFirstDayOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight
          const lastDayOfPrevWeek = new Date(
            parsedFirstDayOfWeek.getTime() - 24 * 60 * 60 * 1000
          );
          if (currentDate > lastDayOfPrevWeek) {
            setDisablePrev(true);
          } else {
            setDisablePrev(false);
          }
        }

        const hasSlots = daysData.some(
          (item) => item.slots && item.slots.length > 0
        );

        if (hasSlots) {
          setNoSlots(false);
          getWeekdays(daysData);
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

  const showSelection = (e: any, slotId: string) => {
    const startTime = cleanTimestamp(slotId);

    setSelectedSlotId(slotId);
    setSelectedDate(formatDateLong(startTime));
    setSelectedTime(formatTime12hr(startTime));
    setStartTime(startTime);

    const buttons = document.querySelectorAll('[data-button="slot-btn"]');

    if (buttons.length > 0) {
      buttons.forEach((btn) => {
        btn.classList.remove(styles.selected);
      });
    }

    e.target.closest('[data-button="slot-btn"]').classList.add(styles.selected);

    // if (isBookableDate(formattedDate)) {
    //   setIsBookableContent(true);
    // } else {
    //   setIsBookableContent(false);
    // }
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

  // const isWorkingDay = (inputDateString: any) => {
  //   const inputDate: any = new Date(inputDateString);
  //   // Not Sat Sun or a public holiday
  //   // TODO - Andy works Saturday mornings - do we need to factor this?
  //   return !(
  //     inputDate.getDay() === 0 ||
  //     inputDate.getDay() === 6 ||
  //     datesNotToBook.indexOf(inputDateString) > -1
  //   );
  // };

  // const nextWorkingDayInDaysTime = (inputDateString: any, days: any) => {
  //   let loopDate = new Date(inputDateString);
  //   let loopDayCount = days;
  //   while (loopDayCount > 0) {
  //     const newDate = loopDate.setDate(loopDate.getDate() + 1);
  //     loopDate = new Date(newDate);
  //     if (isWorkingDay(formatDateYYYYMMDD(loopDate))) {
  //       loopDayCount--;
  //     }
  //   }
  //   return loopDate;
  // };

  useEffect(() => {
    setLoadingSlots(true);
    const firstDay: any = new Date();

    setFirstDayOfWeek(firstDay);

    getSlots(firstDay);
    setDates(getDates(formatDateYYYYMMDD(firstDay)));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSlots(firstDayOfWeek);
  }, [selectedLocation, selectedTypeOfAppointment, selectedScanId]);

  type DateItem = {
    weekDayLabel: string;
    dateLabel: string;
    date: string;
  };

  function filterCurrentWeekDates(dates: DateItem[]): DateItem[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Find the current week's Monday
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    // Find the current week's Sunday
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    // Find next week's Monday
    const nextMonday = new Date(sunday);
    nextMonday.setDate(sunday.getDate() + 1);

    return dates.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= monday && itemDate <= sunday;
    });
  }

  const getWeekdays = (daysList) => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    const containsToday = daysList.some((day) => day.date === formattedToday);

    if (containsToday) {
      setDays(daysList);
      return;
    }

    // Check if all dates in daysList belong to next week
    const firstDate = new Date(daysList[0].date);
    const dayOfWeek = today.getDay(); // Get current day of the week
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const currentWeekMonday = new Date(today);
    currentWeekMonday.setDate(today.getDate() + mondayOffset);

    const nextMonday = new Date(currentWeekMonday);
    nextMonday.setDate(currentWeekMonday.getDate() + 7);

    if (firstDate >= nextMonday) {
      setDays(daysList); // If it's next week's data, use it as is
      return;
    }

    // Otherwise, only return current week's days
    setDays(filterCurrentWeekDates(daysList));
  };

  return (
    <div className={styles.slots}>
      <div className={styles.top}>
        <Text tag="h1" variation="heading-1">
          {props.titleText}
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
                  <span>{props.viewMapText}</span>
                </a>
              </TextLink>
            </div>
          )}
        </div>
      </div>
      {/* {loadingSlots && <LoaderCF loadingMsg={'Loading slots...'} />}  */}
      {/* {!loadingSlots && <div>Slots loaded</div>} */}
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
                    {dates[day]}
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
            {daysOfWeek.map((_day, index) => {
              return (
                <div key={index} className={styles['weekdays-item']}>
                  {days.map((day: any, dateIndex) => {
                    if (day.weekDayLabel === _day) {
                      return (
                        <div key={dateIndex} className={`${styles['time']}`}>
                          {day.slots.map(
                            (slot: any, slotIndex: any) =>
                              !slot.isBlocked && (
                                <button
                                  data-button={'slot-btn'}
                                  key={slotIndex}
                                  //className={`${`${styles['short-appointment']}`}`}
                                  onClick={(e) => {
                                    showSelection(e, slot.id);
                                  }}
                                >
                                  {/* {!isBookableDate(formattedDate) && */}
                                  {/* props.shortNoticeIcon} */}
                                  <div className={styles['btn-txt']}>
                                    <Text
                                      tag="span"
                                      variation="body-medium-large"
                                    >
                                      {removeSeconds(
                                        new Date(
                                          cleanTimestamp(slot.id)
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

                    // }
                  })}
                </div>
              );
            })}
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

export default SlotsCalendarBirthCompany;
