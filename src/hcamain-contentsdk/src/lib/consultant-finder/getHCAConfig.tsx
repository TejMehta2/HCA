import { unstable_cache } from 'next/cache';
import { getItemFromGraphQL } from './getItemFromGraphQL';
import { revalidate } from './revalidateNow';

//HCA APIs
export interface IHCAConfig {
  //HCA API - Doctify To Facilities Lookup
  aPI_HCA_DoctifyToFacilities_BaseURL: string;
  aPI_HCA_DoctifyToFacilities_LegacyBaseURL: string;
  aPI_HCA_DoctifyToFacilities_NoResultsMsg: string;
  aPI_HCA_DoctifyToFacilities_LoadingMsg: string;
  aPI_HCA_DoctifyToFacilities_UtilizesLegacy: boolean;

  //HCA API - Live diary Online consultant booking Consultants
  aPI_HCA_LDB_Consultants_BaseURL: string;
  aPI_HCA_LDB_Consultants_LegacyBaseURL: string;
  aPI_HCA_LDB_Consultants_NoResultsMsg: string;
  aPI_HCA_LDB_Consultants_LoadingMsg: string;
  aPI_HCA_LDB_Consultants_UtilizesLegacy: boolean;

  //HCA API - All Consultants
  aPI_HCA_All_Consultants_BaseURL: string;
  aPI_HCA_All_Consultants_LegacyBaseURL: string;
  aPI_HCA_All_Consultants_NoResultsMsg: string;
  aPI_HCA_All_Consultants_LoadingMsg: string;
  aPI_HCA_All_Consultants_UtilizesLegacy: boolean;
  aPI_HCA_All_Consultants_MockConsultants: boolean;
  aPI_HCA_All_Consultants_MockSlugsList: string;

  //HCA API - Holidays
  aPI_HCA_Holidays_BaseURL: string;
  aPI_HCA_Holidays_LegacyBaseURL: string;
  aPI_HCA_Holidays_NoResultsMsg: string;
  aPI_HCA_Holidays_LoadingMsg: string;
  aPI_HCA_Holidays_UtilizesLegacy: boolean;

  //HCA API - CMAs
  aPI_HCA_CMAs_UseDoctifyData: boolean;
  aPI_HCA_CMAs_BaseURL: string;
  aPI_HCA_CMAs_NoResultsMsg: string;
  aPI_HCA_CMAs_LoadingMsg: string;

  //HCA API - Locations
  aPI_HCA_Locations_BaseURL: string;
  aPI_HCA_Locations_LegacyBaseURL: string;
  aPI_HCA_Locations_NoResultsMsg: string;
  aPI_HCA_Locations_LoadingMsg: string;
  aPI_HCA_Locations_UtilizesLegacy: boolean;

  //HCA API - Forms
  aPI_HCA_EnquireBookingForm_BaseURL: string;
  aPI_HCA_EnquireBookingForm_LegacyBaseURL: string;
  aPI_HCA_EnquireBookingForm_ErrorSubmittingText: string;
  aPI_HCA_EnquireBookingForm_LoadingMsg: string;
  aPI_HCA_EnquireBookingForm_Header: string;
  aPI_HCA_EnquireBookingForm_UtilizesLegacy: boolean;

  //Postcode lookup
  aPI_HCA_PostcodeLookup_BaseURL: string;
  aPI_HCA_PostcodeLookup_LegacyBaseURL: string;
  aPI_HCA_PostcodeLookup_NoResultsMsg: string;
  aPI_HCA_PostcodeLookup_LoadingMsg: string;
  aPI_HCA_PostcodeLookup_UtilizesLegacy: boolean;

  // General
  nextJSRevalidationProfilePageSeconds: number;
  generalConsultantBookingNumber: string;
  hQAddressLocality: string;
  hQAddressRegion: string;
  hQPostalCode: string;
  hQStreetAddress: string;
  //HCA API - Log email
  //aPI_HCA_LogEmail_BaseURL: string;
}

export async function GetHCAConfig(): Promise<IHCAConfig> {
  // revalidateTag('cacheGetHCAConfig'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await _getHCAConfig();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetHCAConfig cache revalidate flag:${revalidate.now()}`
    );
    return await _GetNCHCAConfig();
  } else {
    return await _GetHCAConfig();
  }
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _GetHCAConfig = unstable_cache(
  async (): Promise<IHCAConfig> => {
    console.log('refreshing _getHCAConfig from source..');
    const ret = await _getHCAConfig();
    // test possible return and throw to avoid caching bad results!
    if (ret.aPI_HCA_All_Consultants_BaseURL?.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _GetHCAConfig`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetHCAConfig'],
    revalidate: 3600,
  }
);
// this has the same effect as revalidateTag('cacheGetHCAConfig');
// which should work - but throws - as requires Next 14 / use server
const _GetNCHCAConfig = unstable_cache(
  async (): Promise<IHCAConfig> => {
    console.log('refreshing _getHCAConfig from source..');
    const ret = await _getHCAConfig();
    // test possible return and throw to avoid caching bad results!
    if (ret.aPI_HCA_All_Consultants_BaseURL?.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _GetNCHCAConfig`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetHCAConfig'],
    revalidate: 1,
  }
);

async function _getHCAConfig(): Promise<IHCAConfig> {
  // Sitecore item
  const HCAAPISettingsItemId = '{AF16E5CB-FE0D-4412-A299-96BEF3F5E363}';
  const HCAAPISettingsTemplateName = 'HCA_API_Settings';

  let HCAConfig: IHCAConfig = {
    //HCA API - Doctify To Facilities Lookup
    aPI_HCA_DoctifyToFacilities_BaseURL: '',
    aPI_HCA_DoctifyToFacilities_LegacyBaseURL: '',
    aPI_HCA_DoctifyToFacilities_NoResultsMsg: '',
    aPI_HCA_DoctifyToFacilities_LoadingMsg: '',
    aPI_HCA_DoctifyToFacilities_UtilizesLegacy: true,

    //HCA API - Live diary Online consultant booking Consultants
    aPI_HCA_LDB_Consultants_BaseURL: '',
    aPI_HCA_LDB_Consultants_LegacyBaseURL: '',
    aPI_HCA_LDB_Consultants_NoResultsMsg: '',
    aPI_HCA_LDB_Consultants_LoadingMsg: '',
    aPI_HCA_LDB_Consultants_UtilizesLegacy: true,

    //HCA API - All Consultants
    aPI_HCA_All_Consultants_BaseURL: '',
    aPI_HCA_All_Consultants_LegacyBaseURL: '',
    aPI_HCA_All_Consultants_NoResultsMsg: '',
    aPI_HCA_All_Consultants_LoadingMsg: '',
    aPI_HCA_All_Consultants_UtilizesLegacy: true,
    aPI_HCA_All_Consultants_MockSlugsList: '',
    aPI_HCA_All_Consultants_MockConsultants: false,

    //HCA API - Holidays
    aPI_HCA_Holidays_BaseURL: '',
    aPI_HCA_Holidays_LegacyBaseURL: '',
    aPI_HCA_Holidays_NoResultsMsg: '',
    aPI_HCA_Holidays_LoadingMsg: '',
    aPI_HCA_Holidays_UtilizesLegacy: true,

    //HCA API - CMAs
    aPI_HCA_CMAs_UseDoctifyData: false,
    aPI_HCA_CMAs_BaseURL: '',
    aPI_HCA_CMAs_NoResultsMsg: '',
    aPI_HCA_CMAs_LoadingMsg: '',

    //HCA API - Locations
    aPI_HCA_Locations_BaseURL: '',
    aPI_HCA_Locations_LegacyBaseURL: '',
    aPI_HCA_Locations_NoResultsMsg: '',
    aPI_HCA_Locations_LoadingMsg: '',
    aPI_HCA_Locations_UtilizesLegacy: false,

    //HCA API - Forms
    aPI_HCA_EnquireBookingForm_BaseURL: '',
    aPI_HCA_EnquireBookingForm_LegacyBaseURL: '',
    aPI_HCA_EnquireBookingForm_ErrorSubmittingText: '',
    aPI_HCA_EnquireBookingForm_LoadingMsg: '',
    aPI_HCA_EnquireBookingForm_Header: '',
    aPI_HCA_EnquireBookingForm_UtilizesLegacy: false,

    //Postcode lookup
    aPI_HCA_PostcodeLookup_BaseURL: '',
    aPI_HCA_PostcodeLookup_LegacyBaseURL: '',
    aPI_HCA_PostcodeLookup_NoResultsMsg: '',
    aPI_HCA_PostcodeLookup_LoadingMsg: '',
    aPI_HCA_PostcodeLookup_UtilizesLegacy: false,

    // General
    nextJSRevalidationProfilePageSeconds: 300,
    generalConsultantBookingNumber: '+442070794344', // generic booking number
    hQAddressLocality: 'London',
    hQAddressRegion: 'London',
    hQPostalCode: 'W1G 0PU',
    hQStreetAddress: 'HCA Healthcare, 2 Cavendish Square',
  };

  HCAConfig = await getItemFromGraphQL(
    HCAAPISettingsItemId,
    HCAAPISettingsTemplateName,
    HCAConfig
  );
  //console.log('HCAConfig result:', JSON.stringify(HCAConfig));
  return HCAConfig;
}
