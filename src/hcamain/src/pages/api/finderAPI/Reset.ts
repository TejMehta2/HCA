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
import { IKeyProtection } from './IKeyProtection';

// we don't want to cache the reset function
export const dynamic = 'force-dynamic';

// admin function to purge the data cache
const Reset = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const protectionParams: IKeyProtection | unknown = req.query;
  if (
    (protectionParams as IKeyProtection).key !=
    process.env.ADMIN_PROTECTION_KEY!
  ) {
    console.warn(
      'error, CF admin - Reset called with incorrect or missing admin key'
    );
    return res.status(500).send('error missing or invalid admin protection');
  }
  // first set the flag
  revalidate.setRevalidateNow(true);
  console.log('revalidate flag: ' + revalidate.now());

  console.log('re-validate cacheable data');

  try {
    console.log('getting GetHCAConfig');
    await GetHCAConfig(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting GetC2Config');
    await GetC2Config(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting GetDoctifyConfig');
    await GetDoctifyConfig(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getActiveConsultantSlugs');
    await getActiveConsultantSlugs(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getActiveLiveDiaryConsultantSlugs');
    await getActiveLiveDiaryConsultantSlugs(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getHolidays');
    await getHolidays(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getFacilitiesData');
    await getFacilitiesData(); //
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getCMAs');
    await getCMAs();
  } catch (e) {
    console.log('exception ', e);
  }

  revalidate.setRevalidateNow(false);
  console.log('re-reading cacheable data');

  try {
    console.log('getting GetHCAConfig');
    await GetHCAConfig();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting GetC2Config');
    await GetC2Config();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting GetDoctifyConfig');
    await GetDoctifyConfig();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getActiveConsultantSlugs');
    await getActiveConsultantSlugs();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getActiveLiveDiaryConsultantSlugs');
    await getActiveLiveDiaryConsultantSlugs();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getHolidays');
    await getHolidays();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getFacilitiesData');
    await getFacilitiesData();
  } catch (e) {
    console.log('exception ', e);
  }

  try {
    console.log('getting getCMAs');
    await getCMAs();
  } catch (e) {
    console.log('exception ', e);
  }

  const ret = `<div>done</div>${new Date().toISOString()}`;
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(ret);
};

export default Reset;
