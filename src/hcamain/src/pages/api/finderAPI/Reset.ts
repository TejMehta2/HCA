import { getFacilitiesData } from 'lib/consultant-finder/API_Doctify';
import {
  getActiveConsultantSlugs,
  getActiveLiveDiaryConsultantSlugs,
  getHolidays,
} from 'lib/consultant-finder/API_HCA';
import { GetC2Config } from 'lib/consultant-finder/getC2Config';
import { GetDoctifyConfig } from 'lib/consultant-finder/getDoctifyConfig';
import { GetHCAConfig } from 'lib/consultant-finder/getHCAConfig';
import type { NextApiRequest, NextApiResponse } from 'next';
import { revalidateTag } from 'next/cache';

// we don't want to cache the reset function
export const dynamic = 'force-dynamic';

// admin function to purge the data cache
const Reset = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  console.log('getting cacheable data');

  console.log('getting GetHCAConfig');
  await GetHCAConfig();
  console.log('getting GetC2Config');
  await GetC2Config();
  console.log('getting GetDoctifyConfig');
  await GetDoctifyConfig();
  console.log('getting getActiveConsultantSlugs');
  await getActiveConsultantSlugs();
  console.log('getting getActiveLiveDiaryConsultantSlugs');
  await getActiveLiveDiaryConsultantSlugs();
  console.log('getting getHolidays');
  await getHolidays();
  console.log('getting getFacilitiesData');
  await getFacilitiesData();

  console.log('resetting cache');

  try {
    revalidateTag('cacheGetHCAConfig');
  } catch (error) {
    console.warn(`exception purging cacheGetHCAConfig cache: ${error}`);
  }

  try {
    revalidateTag('cacheGetC2Config');
  } catch (error) {
    console.warn(`exception purging cacheGetC2Config cache: ${error}`);
  }

  try {
    revalidateTag('cacheGetDoctifyConfig');
  } catch (error) {
    console.warn(`exception purging cacheGetDoctifyConfig cache: ${error}`);
  }

  try {
    revalidateTag('cacheGetActiveConsultantSlugs');
  } catch (error) {
    console.warn(
      `exception purging cacheGetActiveConsultantSlugs cache: ${error}`
    );
  }

  try {
    revalidateTag('cacheGetActiveLiveDiaryConsultantSlugs');
  } catch (error) {
    console.warn(
      `exception purging cacheGetActiveLiveDiaryConsultantSlugs cache: ${error}`
    );
  }

  try {
    revalidateTag('cacheGetHolidays');
  } catch (error) {
    console.warn(`exception purging cacheGetHolidays cache: ${error}`);
  }

  try {
    revalidateTag('cacheGetFacilitiesData');
  } catch (error) {
    console.warn(`exception purging cacheGetFacilitiesData cache: ${error}`);
  }

  console.log('re-reading cacheable data');
  console.log('getting GetHCAConfig');
  await GetHCAConfig();
  console.log('getting GetC2Config');
  await GetC2Config();
  console.log('getting GetDoctifyConfig');
  await GetDoctifyConfig();
  console.log('getting getActiveConsultantSlugs');
  await getActiveConsultantSlugs();
  console.log('getting getActiveLiveDiaryConsultantSlugs');
  await getActiveLiveDiaryConsultantSlugs();
  console.log('getting getHolidays');
  await getHolidays();
  console.log('getting getFacilitiesData');
  await getFacilitiesData();

  const ret = '<div>done</div>';
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(ret);
};

export default Reset;
