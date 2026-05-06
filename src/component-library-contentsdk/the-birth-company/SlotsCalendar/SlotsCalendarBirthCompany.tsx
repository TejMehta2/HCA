/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import {
  SlotsCalendarBirthCompanyProps,
  day,
  daysList,
} from './SlotsCalendarBirthCompany.types';
import styles from '../../consultant-finder/SlotsCalendar/SlotsCalendar.module.scss';
import {
  formatDateYYYYMMDD,
  formatDateLong,
  formatDateDDMMM,
} from '../../utility-functions/index';
import { TheBirthCompanyContext } from '../../context/theBirthCompanyContext';
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
  const [days, setDays] = useState<day[] | []>([]);
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
  };

  const showPrevWeek = () => {
    setLoadingSlots(true);
    const prevWeek = new Date(firstDayOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setFirstDayOfWeek(getFirstDayOfWeek(prevWeek));
  };

  const getSlots = (firstDay?: string) => {
    setLoadingSlots(true);
    setDisablePrev(true);
    setDisableNext(true);
    setSelectedDate('');
    setSelectedTime('');

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

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setUTCHours(0, 0, 0, 0);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        const hasSlots = daysData.some(
          (item: day) =>
            item.slots &&
            item.slots.length > 0 &&
            new Date(item.date) <= lastDayOfWeek
        );

        if (hasSlots) {
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

    const today = new Date();
    const firstDayOfCurrentWeek: any = getFirstDayOfWeek(today);

    setFirstDayOfWeek(firstDayOfCurrentWeek);
    setDates(getDates(formatDateYYYYMMDD(firstDayOfCurrentWeek)));

    getSlots(firstDayOfCurrentWeek);
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    getSlots(formatDateYYYYMMDD(firstDayOfWeek));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation,
    selectedTypeOfAppointment,
    selectedScanId,
    firstDayOfWeek,
  ]);

  const getWeekdays = (daysList: daysList) => {
    if (daysList.length === 0) return;

    // Step 1: Find the earliest date in `daysList`
    const earliestDate = new Date(
      Math.min(...daysList.map((day) => new Date(day.date).getTime()))
    );

    // Step 2: Get the Monday of that week
    const firstDayOfWeek = getFirstDayOfWeek(earliestDate);

    // Step 3: Generate the full week (Monday - Sunday)
    const fullWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);

      const formattedDate = formatDateYYYYMMDD(date); // "YYYY-MM-DD"
      const formattedLabel = formatDateDDMMM(date); // "02 Apr"

      const existingDay = daysList.find((d) => d.date === formattedDate);

      return (
        existingDay || {
          weekDayLabel: daysOfWeek[i],
          dateLabel: formattedLabel,
          date: formattedDate,
          slots: [],
        }
      );
    });

    setDays(fullWeek as day[]);
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
            <Text tag="p" variation="body-medium-medium">
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
