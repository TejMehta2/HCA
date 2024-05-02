import { formatDaysText } from 'src/jss-abstractions/OpeningHoursTextFormatting/FormatDaysText';

import { ContactUnitFields } from './OpeningHours.types';

export const OpeningHours = (contactUnit: ContactUnitFields) => {
  try {
    const availability: string[] = [];

    contactUnit.children.results.map((children) => {
      children.children.results.map((openingHours) => {
        const days: string[] = [];

        openingHours.dayOfWeek.dayOfWeekList.map((day) => {
          days.push(day.dayName.value);
        });

        availability.push(
          formatDaysText(
            days,
            openingHours.opens.value,
            openingHours.closes.value
          )
        );
      });
    });

    const availabilityString = availability.join(', ');

    return availabilityString;
  } catch (err) {
    return undefined;
  }
};
