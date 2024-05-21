import { getFacilitiesData } from 'lib/consultant-finder/API_Doctify';
import {
  getActiveConsultantSlugs,
  getActiveLiveDiaryConsultantSlugs,
  getCMAs,
  getHolidays,
} from 'lib/consultant-finder/API_HCA';
import { GetC2Config } from 'lib/consultant-finder/getC2Config';
import { GetDoctifyConfig } from 'lib/consultant-finder/getDoctifyConfig';
import { GetHCAConfig } from 'lib/consultant-finder/getHCAConfig';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
import type { NextApiRequest, NextApiResponse } from 'next';
//mport { revalidateTag } from 'next/cache';

// we don't want to cache the reset function
export const dynamic = 'force-dynamic';

// admin function to purge the data cache
const Reset = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  // first set the flag
  revalidate.setRevalidateNow(false);
  console.log('getting GetHCAConfig');
  await GetHCAConfig();
  console.log('getting getCMAs');
  await getCMAs();
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

  const ret = `<div>done</div>${new Date().toISOString()}`;
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(ret);
};

export default Reset;
