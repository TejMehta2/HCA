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

  await getActiveConsultantSlugs();
  await getActiveLiveDiaryConsultantSlugs();
  await getHolidays();
  console.log('reset cache');

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

  const ret = '<div>done</div>';
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(ret);
};

export default Reset;
