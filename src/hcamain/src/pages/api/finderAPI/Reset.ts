import { getFacilitiesData } from 'lib/consultant-finder/API_Doctify';
import {
  getActiveConsultantSlugs,
  getActiveLiveDiaryConsultantSlugs,
  getHolidays,
} from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';
import { revalidateTag } from 'next/cache';
// admin function to purge the data cache
const Reset = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  console.log('getting cacheable data');
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
