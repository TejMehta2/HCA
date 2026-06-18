// Example output format: 'Nov 7, 2023'
const formatDate = (date: Date): string => {
  let month = date.toLocaleString(undefined, {
    month: 'short',
  });
  // if returning 4 char month e.g. Sept 7, 2023 truncate to 3 chars
  month = month.substring(0, 3);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default formatDate;
