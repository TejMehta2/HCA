import { type JSX } from 'react';
import { type GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import { getSpecialistProfileData } from 'lib/consultant-finder/API_Doctify';
import {
  Default as CMADisclosuresClient,
  type CMADisclosuresProps,
  type CMADisclosuresServerSideProps,
} from './CMADisclosuresClient';

const getRouteParam = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value[0]?.toString() || '';
  }

  return value?.toString() || '';
};

export const getComponentServerProps: GetComponentServerProps = async (
  _rendering,
  _layoutData,
  context
) => {
  const slug = getRouteParam(context?.params?.requestPath);

  if (!slug) {
    return {
      cmaHTML: '',
    } satisfies CMADisclosuresServerSideProps;
  }

  const consultantProfileJson = await getSpecialistProfileData(slug);

  return {
    cmaHTML: consultantProfileJson?.customFields?.cmaHtml || '',
  } satisfies CMADisclosuresServerSideProps;
};

export const Default = ({
  rendering,
  params,
  fields,
}: CMADisclosuresProps): JSX.Element => (
  <CMADisclosuresClient rendering={rendering} params={params} fields={fields} />
);
