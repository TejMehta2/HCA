interface TelephoneNumberFields {
  phoneNumberLabel: { value: string };
  phoneNumber: { value: string };
  internationPhoneNumber: { value: string };
}

interface DayOfWeekFields {
  dayName: { value: string };
}

interface OpeningHoursSpecificationFields {
  dayOfWeek: {
    dayOfWeekList: DayOfWeekFields[];
  };
  opens: { value: string };
  closes: { value: string };
  validFrom: { value: string };
  validThrough: { value: string };
}

interface OpeningHoursFields {
  children: {
    results: OpeningHoursSpecificationFields[];
  };
}

export interface ContactUnitFields {
  contactUnitName: { value: string };
  telephoneNumber: {
    telephoneNumberList: TelephoneNumberFields[];
  };
  children: {
    results: OpeningHoursFields[];
  };
}
