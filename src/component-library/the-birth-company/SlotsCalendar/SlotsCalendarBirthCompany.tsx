/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import {
  SlotsCalendarBirthCompanyProps,
  slots,
  day,
  daysList,
} from './SlotsCalendarBirthCompany.types';
import styles from '../../consultant-finder/SlotsCalendar/SlotsCalendar.module.scss';
import {
  formatDateYYYYMMDD,
  formatDateLong,
  formatTime12hr,
} from '../../utility-functions/index';
import { TheBirthCompanyContext } from '../../../hcamain/src/context/theBirthCompanyContext';
import LoaderCF from '../../consultant-finder/LoaderCF/LoaderCF';
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
    setSelectedDate,
    setSelectedTime,
    setStartTime,
    setSelectedSlotId,
    setSelectedLocationName,
  } = useContext(TheBirthCompanyContext);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<any>(null);
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState<day[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [noSlots, setNoSlots] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(true);
  const [selectedLocationUrl, setSelectedLocationUrl] = useState('');

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

  const getDates: any = (firstDayOfWeek: string) => {
    const weekOfDates = getWeekDates(firstDayOfWeek);
    return weekOfDates;
  };

  const showNextWeek = () => {
    setLoadingSlots(true);
    const nextWeek = new Date(firstDayOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setFirstDayOfWeek(getFirstDayOfWeek(nextWeek));
    getSlots(formatDateYYYYMMDD(getFirstDayOfWeek(nextWeek)));
  };

  const showPrevWeek = () => {
    setLoadingSlots(true);
    const prevWeek = new Date(firstDayOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setFirstDayOfWeek(getFirstDayOfWeek(prevWeek));
    getSlots(formatDateYYYYMMDD(getFirstDayOfWeek(prevWeek)));
  };

  const getSlots = (firstDay?: string) => {
    setLoadingSlots(true);
    setDisablePrev(true);
    setDisableNext(true);
    setSelectedDate('');
    setSelectedTime('');

    // this is to test out previous dates when today is monday, to be removed
    // let falseDate;
    // if (firstDay) {
    //   const todaysDate = new Date();
    //   const fromDateAsDate = new Date(firstDay);

    //   if (
    //     fromDateAsDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
    //   ) {
    //     falseDate = fromDateAsDate;
    //     falseDate.setDate(fromDateAsDate.getDate() + 4);

    //     firstDay = falseDate.toString();
    //   }
    // }

    // if (firstDay) {
    //   console.log('first day slots: ' + firstDay);
    // }

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
        setLoadingSlots(false);

        const locationName = res?.data?.location?.name;
        const locationUrl = res.data?.location?.mapLocationUrl;
        if (locationName && locationUrl) {
          setSelectedLocationName(locationName);
          setSelectedLocationUrl(locationUrl);
        }

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
          (item: slots) => item.slots && item.slots.length > 0
        );

        if (hasSlots > 0) {
          getWeekdays(daysData);
          setNoSlots(false);
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

  const showSelection = (e: any, slotId: string, timeLabel: string) => {
    const startTime = cleanTimestamp(slotId);

    setSelectedSlotId(slotId);
    setSelectedDate(formatDateLong(startTime));
    setSelectedTime(timeLabel);
    setStartTime(startTime);

    const buttons = document.querySelectorAll('[data-button="slot-btn"]');

    if (buttons.length > 0) {
      buttons.forEach((btn) => {
        btn.classList.remove(styles.selected);
      });
    }

    e.target.closest('[data-button="slot-btn"]').classList.add(styles.selected);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation,
    selectedTypeOfAppointment,
    selectedScanId,
    firstDayOfWeek,
  ]);

  function filterCurrentWeekDates(dates: day[]): day[] {
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

  const getWeekdays = (daysList: daysList) => {
    const today = new Date();

    // this is to test out previous dates when today is monday, to be removed
    // const current = new Date();
    // today.setDate(current.getDate() + 4);

    const formattedToday = today.toISOString().split('T')[0];

    const containsToday = daysList.some(
      (day: day) => day.date === formattedToday
    );

    if (!containsToday) {
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
          {selectedLocationUrl && (
            <div className={styles.map}>
              <TextLink>
                <a href={selectedLocationUrl} target="_blank">
                  <Icons iconName="iconPin" />
                  <span>{props.viewMapText}</span>
                </a>
              </TextLink>
            </div>
          )}
        </div>
      </div>

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
            {daysOfWeek.map((day: any, index) => (
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
                                  onClick={(e) => {
                                    showSelection(e, slot.id, slot.label);
                                  }}
                                >
                                  <div className={styles['btn-txt']}>
                                    <Text
                                      tag="span"
                                      variation="body-medium-large"
                                    >
                                      {slot.label}
                                    </Text>
                                  </div>
                                </button>
                              )
                          )}
                        </div>
                      );
                    }
                    return;
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.legend}></div>
    </div>
  );
};

export default SlotsCalendarBirthCompany;
