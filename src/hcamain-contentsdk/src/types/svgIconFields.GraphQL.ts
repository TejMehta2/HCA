import { Field } from '@sitecore-content-sdk/nextjs';

export type svgIconFields = {
  svgMarkup?: Field<string>;
};

export type svgIconFieldsTargetItem = {
  targetItem?: svgIconFields;
};
