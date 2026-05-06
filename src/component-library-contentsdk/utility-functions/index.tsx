/* eslint-disable @typescript-eslint/no-explicit-any */
// capitalise frist letter of all words in a string
export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return '';
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

// format data to object extracting key and value
interface FieldsObject {
  [key: string]: { value: unknown };
}

export const transformFields = (
  fields: FieldsObject
): Record<string, unknown> => {
  const transformedObject: Record<string, unknown> = {};
  for (const key in fields) {
    transformedObject[key] = fields[key].value;
  }
  return transformedObject;
};

// check object has properties or it is defined and not null
export const isObjectDefined = (Obj: object) => {
  if (
    Obj === null ||
    typeof Obj !== 'object' ||
    Object.prototype.toString.call(Obj) === '[object Array]'
  ) {
    return false;
  } else {
    for (const prop in Obj) {
      if (Obj.hasOwnProperty(prop)) {
        return true;
      }
    }
    return JSON.stringify(Obj) !== JSON.stringify({});
  }
};

// calculate years of experience
export const yearsExperience = (yearsExp: string) => {
  // Check if yearsExp is a string
  if (typeof yearsExp !== 'string') {
    // Handle the case where yearsExp is not a string
    return 0; // Or whatever default value you want to return
  }

  const reversedDate = yearsExp.split('-').reverse().join('-');
  const yearsNew =
    new Date(
      new Date().getTime() - new Date(reversedDate).getTime()
    ).getFullYear() - 1970;
  return yearsNew;
};

// format date DD-MM-YYYY
// 2024-02-19T11:58:44.022Z to 19-02-2024
export const formatDate = (dateToFormat: string) => {
  const dateTest = dateToFormat;
  const entryDate = dateTest.substring(0, 10);
  const date = entryDate.split('-').reverse().join('-');

  return date;
};

// Helper function to format a date as "YYYY-MM-DD"
export const formatDateYYYYMMDD = (dateToCheck: any) => {
  const date = new Date(dateToCheck);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to format a date as "03 Apr"
export const formatDateDDMMM = (dateToCheck: any) => {
  const date = new Date(dateToCheck);
  const month = dateToCheck.toLocaleString('default', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${month}`;
};

// format time to GB fomat: Day of the Week, Short Month: Wed, Mar 27
export const formatDateShort = (dateString: string | undefined) => {
  // Check if dateString is undefined or null
  if (!dateString) {
    return ''; // or any default value you want to return
  }

  const date = new Date(dateString);

  const options: object = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
};

// format time to GB fomat: Day of the Week, number of date Month Year
export const formatDateLong = (dateString: string) => {
  const date = new Date(dateString);

  const options: object = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
};

// format time 00:00, remove seconds
export const removeSeconds = (time: string) => {
  return time.split(':').slice(0, 2).join(':');
};

// format time based on 12hr format am/pm
export const formatTime12hr = (dateString: any) => {
  const date = new Date(dateString);

  const options: object = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  let formattedTime = date.toLocaleTimeString('en-GB', options);

  const hour = date.getHours();
  if (hour === 0 || hour === 12) {
    formattedTime = formattedTime.replace(/^0(?=:)/, '12');
  }

  return formattedTime;
};

// format date day,month,year
export const formatDateDMY = (date: string) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

// remove html tags from a string

export function removeTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

export const scrollToRef = (section: React.RefObject<HTMLElement>) => {
  setTimeout(function () {
    if (section?.current) {
      const headerOffset = window.innerWidth > 1135 ? 110 : 78; //  accounting for site header
      const elementPosition = section?.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, 500);
};

/**
 * Generates a safe ID string for use as an HTML id attribute.
 * The last non-empty parameter takes precedence over all others.
 * @param args - A list of string parameters.
 * @returns A string that is safe to use as an HTML id attribute.
 */
export const generateHtmlSafeId = (title: string | undefined) => {
  const source = title?.trim();

  if (!source) {
    return ''; // Fallback if no valid parameter is provided.
  }

  // Replace spaces with hyphens, remove non-alphanumeric characters (except hyphens),
  // and ensure it starts with a letter or underscore for valid HTML id.
  const safeId = source
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters.
    .replace(/\s+/g, '-') // Replace spaces with hyphens.
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens.

  return safeId || ''; // Fallback if the result is empty.
};

// check if device is mobile
export const isMobile = (breakpoint = 992): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
};

