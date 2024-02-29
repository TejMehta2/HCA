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
