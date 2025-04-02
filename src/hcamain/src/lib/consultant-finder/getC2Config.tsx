import { unstable_cache } from 'next/cache';
import { getItemFromGraphQL } from './getItemFromGraphQL';
import { revalidate } from './revalidateNow';

//C2 APIs
interface Ic2Config {
  // are we using the new C# API?
  aPI_C2_UsingCSharpAPI: boolean;
  //C2_FirstAppointment
  aPI_C2_FirstAppointment_BaseURL: string;
  aPI_C2_FirstAppointment_NoResultsMsg: string;
  aPI_C2_FirstAppointment_LoadingMsg: string;
  aPI_C2_FirstAppointment_Header: string;
  //C2_GetConsultantDetails
  aPI_C2_GetConsultantDetails_BaseURL: string;
  aPI_C2_GetConsultantDetails_NoResultsMsg: string;
  aPI_C2_GetConsultantDetails_LoadingMsg: string;
  aPI_C2_GetConsultantDetails_Header: string;
  //C2_GetConsultantSlots
  aPI_C2_GetConsultantSlots_BaseURL: string;
  aPI_C2_GetConsultantSlots_NoResultsMsg: string;
  aPI_C2_GetConsultantSlots_LoadingMsg: string;
  aPI_C2_GetConsultantSlots_Header: string;
  //C2_ReserveConsultantSlot
  aPI_C2_ReserveConsultantSlot_BaseURL: string;
  aPI_C2_ReserveConsultantSlot_NoResultsMsg: string;
  aPI_C2_ReserveConsultantSlot_LoadingMsg: string;
  aPI_C2_ReserveConsultantSlot_Header: string;
  //C2_BookingEnquiry
  aPI_C2_BookingEnquiry_BaseURL: string;
  aPI_C2_BookingEnquiry_NoResultsMsg: string;
  aPI_C2_BookingEnquiry_LoadingMsg: string;
  aPI_C2_BookingEnquiry_Header: string;
}

export async function GetC2Config(): Promise<Ic2Config> {
  // revalidateTag('cacheGetC2Config'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await _getC2Config();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetC2Config cache revalidate flag:${revalidate.now()}`
    );
    return await _GetNCC2Config();
  } else {
    return await _GetC2Config();
  }
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _GetC2Config = unstable_cache(
  async (): Promise<Ic2Config> => {
    console.log('refreshing _getC2Config from source..');
    const ret = await _getC2Config();
    // test possible return and throw to avoid caching bad results!
    if (ret.aPI_C2_GetConsultantSlots_BaseURL?.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _GetC2Config`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetC2Config'],
    revalidate: 3600,
  }
);
// this has the same effect as revalidateTag('cacheGetHCAConfig');
// which should work - but throws - as requires Next 14 / use server
const _GetNCC2Config = unstable_cache(
  async (): Promise<Ic2Config> => {
    console.log('refreshing _getC2Config from source..');
    const ret = await _getC2Config();
    // test possible return and throw to avoid caching bad results!
    if (ret.aPI_C2_GetConsultantSlots_BaseURL?.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _GetNCC2Config`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetC2Config'],
    revalidate: 1,
  }
);

async function _getC2Config(): Promise<Ic2Config> {
  // Sitecore item
  const C2APISettingsItemId = '{13DC9C82-D428-4DDB-845F-2712590E133E}';
  const C2APISettingsTemplateName = 'C2_API_Settings';

  let c2Config: Ic2Config = {
    aPI_C2_UsingCSharpAPI: true,
    aPI_C2_FirstAppointment_BaseURL: '',
    aPI_C2_FirstAppointment_NoResultsMsg: '',
    aPI_C2_FirstAppointment_LoadingMsg: '',
    aPI_C2_FirstAppointment_Header: '',
    aPI_C2_GetConsultantDetails_BaseURL: '',
    aPI_C2_GetConsultantDetails_NoResultsMsg: '',
    aPI_C2_GetConsultantDetails_LoadingMsg: '',
    aPI_C2_GetConsultantDetails_Header: '',
    aPI_C2_GetConsultantSlots_BaseURL: '',
    aPI_C2_GetConsultantSlots_NoResultsMsg: '',
    aPI_C2_GetConsultantSlots_LoadingMsg: '',
    aPI_C2_GetConsultantSlots_Header: '',
    aPI_C2_ReserveConsultantSlot_BaseURL: '',
    aPI_C2_ReserveConsultantSlot_NoResultsMsg: '',
    aPI_C2_ReserveConsultantSlot_LoadingMsg: '',
    aPI_C2_ReserveConsultantSlot_Header: '',
    aPI_C2_BookingEnquiry_BaseURL: '',
    aPI_C2_BookingEnquiry_NoResultsMsg: '',
    aPI_C2_BookingEnquiry_LoadingMsg: '',
    aPI_C2_BookingEnquiry_Header: '',
  };
  c2Config = await getItemFromGraphQL(
    C2APISettingsItemId,
    C2APISettingsTemplateName,
    c2Config
  );
  //console.log('c2Config result:', JSON.stringify(c2Config));
  //console.log('aPI_C2_FirstAppointment_BaseURL: ', c2Config.aPI_C2_FirstAppointment_BaseURL);
  return c2Config;
}
