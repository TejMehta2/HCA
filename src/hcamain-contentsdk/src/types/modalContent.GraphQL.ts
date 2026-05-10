import { Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { svgIconFieldsTargetItem } from './svgIconFields.GraphQL';

export type ModalContentFields = {
  title?: Field<string>;
  text?: Field<string>;
  primaryCTAIcon?: svgIconFieldsTargetItem;
  primaryCTA?: { jsonValue: LinkField };
  primaryCTAVariant?: { targetItem?: { name: string } };
  secondaryCTAIcon?: svgIconFieldsTargetItem;
  secondaryCTA?: { jsonValue: LinkField };
  secondaryCTAVariant?: { targetItem?: { name: string } };
  tertiaryCTAIcon?: svgIconFieldsTargetItem;
  tertiaryCTA?: { jsonValue: LinkField };
  tertiaryCTAVariant?: { targetItem?: { name: string } };
  quaternaryCTAIcon?: svgIconFieldsTargetItem;
  quaternaryCTA?: { jsonValue: LinkField };
  quaternaryCTAVariant?: { targetItem?: { name: string } };
};
