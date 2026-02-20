import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { svgIconFieldsTargetItem } from './svgIconFields.GraphQL';

export type ModalContentFields = {
  title?: Field<string>;
  text?: Field<string>;
  primaryCTAIcon?: svgIconFieldsTargetItem;
  primaryCTA?: { jsonValue: LinkField };
  primaryCTAVariant?: { name: string };
  secondaryCTAIcon?: svgIconFieldsTargetItem;
  secondaryCTA?: { jsonValue: LinkField };
  secondaryCTAVariant?: { name: string };
  tertiaryCTAIcon?: svgIconFieldsTargetItem;
  tertiaryCTA?: { jsonValue: LinkField };
  tertiaryCTAVariant?: { name: string };
  quaternaryCTAIcon?: svgIconFieldsTargetItem;
  quaternaryCTA?: { jsonValue: LinkField };
  quaternaryCTAVariant?: { name: string };
};
