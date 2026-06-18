import { DateField } from '@sitecore-content-sdk/nextjs';
import formatDate from './formatDate';
import { JssDateProps } from './JssDate.types';

const JssDate = (props: JssDateProps) => {
  const { field, formatter = formatDate, editable = true } = props;
  if (!field) return <></>;

  const isEditing = field?.metadata && editable;

  if (isEditing)
    return <DateField tag={'span'} field={field} editable={editable} />;

  const value = field?.value;
  if (!value) return null;

  const date = new Date(value);
  return (
    <span>
      <time dateTime={date.toISOString()}>{formatter(date)}</time>
    </span>
  );
};

export default JssDate;
