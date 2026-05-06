import { DateField } from '@sitecore-content-sdk/nextjs';
import formatDate from './formatDate';
import { JssDateProps } from './JssDate.types';

const JssDate = (props: JssDateProps) => {
  const { field, formatter = formatDate, editable = true } = props;
  if (!field) return <></>;

  return (
    <DateField
      tag={'div'}
      field={field}
      editable={editable}
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
