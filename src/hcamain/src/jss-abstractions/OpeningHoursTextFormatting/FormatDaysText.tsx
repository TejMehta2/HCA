import { format, parse } from 'date-fns';
//  function to output the opening days and times as a string
//  expected format for example: Monday to Friday 9am - 5pm

export const formatDaysText = (
  days: string[],
  opens: string,
  closes: string
) => {
  try {
    // Check if days provided are an uninterrupted sequence, then form string
    // Double the weekdays to account for sequences which cross the weekend
    const weekString = JSON.stringify([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
    const daysSubstring = JSON.stringify(days)
      .replace('[', '')
      .replace(']', '');
    const isSequence = days?.length > 1 && weekString.includes(daysSubstring);
    const availabilityDays = isSequence
      ? `${days[0]} to ${days[days.length - 1]}`
      : days.join(', ');

    let alwaysOpen = false;
    if (opens === '00:00' && closes === '23:59') {
      alwaysOpen = true;
    }

    let closed = false;
    if (opens === '00:00' && closes === '00:00') {
      closed = true;
    }

    let openingHoursText;

    if (!alwaysOpen && !closed) {
      const openParsed = parse(opens, 'HH:mm', new Date());
      const closesParsed = parse(closes, 'HH:mm', new Date());

      const opensFormatted =
        openParsed.getMinutes() > 0
          ? format(openParsed, 'h:mmaaa')
          : format(openParsed, 'haaa');

      const closesFormatted =
        closesParsed.getMinutes() > 0
          ? format(closesParsed, 'h:mmaaa')
          : format(closesParsed, 'haaa');

      openingHoursText = `${availabilityDays}: ${opensFormatted} - ${closesFormatted}`;
    } else if (alwaysOpen) {
      openingHoursText = `${availabilityDays}: 24h`;
    } else {
      openingHoursText = `${availabilityDays}: Closed`;
    }

    return openingHoursText;
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.error(err);
    return '';
  }
};
