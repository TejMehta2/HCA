import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type svgIconFields = {
  svgMarkup?: Field<string>;
};

export type svgIconFieldsTargetItem = {
  targetItem?: svgIconFields;
};
