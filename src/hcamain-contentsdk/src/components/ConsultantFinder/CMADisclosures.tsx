import { type JSX } from 'react';
import { getSpecialistProfileData } from 'lib/consultant-finder/API_Doctify';
import {
  Default as CMADisclosuresClient,
  type CMADisclosuresProps,
} from './CMADisclosuresClient';
import type { FinderContext } from 'src/types/finder';
import { debug } from '@sitecore-content-sdk/nextjs';

const getFinderContext = (props: CMADisclosuresProps) =>
  props.page.layout.sitecore
    .context as typeof props.page.layout.sitecore.context & {
    finder?: FinderContext;
  };

const fetchCMADisclosure = async (
  props: CMADisclosuresProps
): Promise<string> => {
  const slug = getFinderContext(props).finder?.consultantSlug || '';

  debug.common('fetchCMADisclosure slug', slug);

  if (!slug) {
    return '';
  }


  const consultantProfileJson = await getSpecialistProfileData(slug);

  return consultantProfileJson?.customFields?.cmaHtml || '';
};

export const Default = async (
  props: CMADisclosuresProps
): Promise<JSX.Element> => {
  const cmaHTML = await fetchCMADisclosure(props);

  return (
    <CMADisclosuresClient
      rendering={props.rendering}
      params={props.params}
      fields={props.fields}
      cmaHTML={cmaHTML}
    />
  );
};
