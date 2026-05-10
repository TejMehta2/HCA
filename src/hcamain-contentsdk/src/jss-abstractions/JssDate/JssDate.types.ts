import { Field } from '@sitecore-content-sdk/nextjs';

export interface JssDateProps {
  field?: Field<string>;
  formatter?: (date: Date) => string;
  editable?: boolean;
}
