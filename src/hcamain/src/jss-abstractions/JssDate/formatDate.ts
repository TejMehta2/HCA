// Example output format: 'Nov 7, 2023'
const formatDate = (date: Date) => {
  const month = date.toLocaleString(undefined, {
    month: 'short',
  });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default formatDate;
