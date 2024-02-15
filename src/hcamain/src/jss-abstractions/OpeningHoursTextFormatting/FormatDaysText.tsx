import { format, parse } from 'date-fns';
//  function to output the opening days and times as a string
//  expected format for example: Monday to Friday 9am - 5pm

export const formatDaysText = (
  days: string[],
  opens: string,
  closes: string
) => {
  const includesAll = (arr: string[], values: string[]) =>
    values.every((v: string) => arr.includes(v));

  let availabilityDays;

  //  Check if all weekdays are included, or if it's both weekend days or if neither output the days available.
  //  Trying to account for a case where opening days could be Mon-Wed for example
  if (
    includesAll(days, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
  ) {
    availabilityDays = 'Monday to Friday';
  } else if (includesAll(days, ['Saturday', 'Sunday'])) {
    availabilityDays = 'Saturday and Sunday';
  } else {
    availabilityDays = days.join(', ');
  }

  const opensFormatted = format(parse(opens, 'hh:mm', new Date()), 'haaa');
  const closessFormatted = format(parse(closes, 'HH:mm', new Date()), 'haaa');

  const openingHoursText = `${availabilityDays} ${opensFormatted} - ${closessFormatted}`;

  return openingHoursText;
};
