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
