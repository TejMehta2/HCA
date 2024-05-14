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

  const openingHoursText = `${availabilityDays} ${opensFormatted} - ${closesFormatted}`;

  return openingHoursText;
};
