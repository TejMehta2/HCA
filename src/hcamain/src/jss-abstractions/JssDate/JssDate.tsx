import { DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import formatDate from './formatDate';
import { JssDateProps } from './JssDate.types';
//import { parseISO, format } from 'date-fns';

const JssDate = (props: JssDateProps) => {
  const { field, formatter = formatDate } = props;
  if (!field) return <></>;

  /* if (!field.value.includes('-')) {
    const parsedDate = parseISO(field.value);
    const formattedDate = format(parsedDate, 'MMM d, yyyy');

    return <time dateTime={formattedDate}>{formattedDate}</time>;
  } */
  return (
    <DateField
      tag={'time'}
      field={field}
      render={(date) =>
        date ? (
          <time dateTime={date.toLocaleDateString()}>{formatter(date)}</time>
        ) : (
          <></>
        )
      }
    />
  );
};

export default JssDate;
