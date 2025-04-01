import { formatDaysText } from 'src/jss-abstractions/OpeningHoursTextFormatting/FormatDaysText';

import { ContactUnitFields } from './OpeningHours.types';

export const OpeningHours = (
  contactUnit?: ContactUnitFields,
  format: 'string' | 'linebreaks' = 'string'
) => {
  if (!contactUnit) return undefined;
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

    if (format === 'string') {
      return availability.join(', ');
    }

    return availability.map((item, index) => <div key={index}>{item}</div>);
  } catch (err) {
    return undefined;
  }
};
