import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface JssDateProps {
  field?: Field<string>;
  formatter?: (date: Date) => string;
  editable?: boolean;
}
