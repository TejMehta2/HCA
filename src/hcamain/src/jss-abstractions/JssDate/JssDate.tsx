import { DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import formatDate from './formatDate';
import { JssDateProps } from './JssDate.types';

const JssDate = (props: JssDateProps) => {
  const { field, formatter = formatDate } = props;
  if (!field) return <></>;

  return (
    <DateField
      tag={'div'}
      field={field}
      render={(date) =>
        date ? (
          <time dateTime={date.toLocaleDateString('en-GB')}>
            {formatter(date)}
          </time>
        ) : (
          <></>
        )
      }
    />
  );
};

export default JssDate;
