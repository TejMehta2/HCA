import {
  ComponentRendering,
  LayoutServiceData,
} from '@sitecore-content-sdk/nextjs';
import type { MetadataFields } from 'components/Page Content/Metadata/Metadata';

const METADATA_COMPONENT_NAME = 'Metadata';
const METADATA_PLACEHOLDER_NAME = 'headless-head';

type MetadataRendering = ComponentRendering & {
  fields?: MetadataFields;
};

export const getMetadataRendering = (
  layoutData: LayoutServiceData
): MetadataRendering | undefined => {
  const headRenderings =
    layoutData.sitecore.route?.placeholders?.[METADATA_PLACEHOLDER_NAME] ?? [];

  const nestedHeadRenderings = headRenderings.flatMap((rendering) =>
    Object.values(rendering.placeholders ?? {}).flat()
  );

  return nestedHeadRenderings.find(
    (rendering) => rendering.componentName === METADATA_COMPONENT_NAME
  ) as MetadataRendering | undefined;
};

export const getMetadataFields = (
  layoutData: LayoutServiceData
): MetadataFields | undefined => getMetadataRendering(layoutData)?.fields;

export const getMetadataGtmKey = (
  layoutData: LayoutServiceData
): string | undefined => getMetadataFields(layoutData)?.GtmKey?.value;
