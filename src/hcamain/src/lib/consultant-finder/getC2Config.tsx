import { unstable_cache } from 'next/cache';
import { getItemFromGraphQL } from './getItemFromGraphQL';
import { revalidate } from './revalidateNow';

//C2 APIs
interface Ic2Config {
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
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
export const GetC2Config = unstable_cache(
  async (): Promise<Ic2Config> => {
    console.log('refreshing _getC2Config from source..');
    return await _getC2Config();
  },
  ['cacheGetC2Config'],
  {
    tags: ['cacheGetC2Config'],
    revalidate: revalidate.now() ? 0 : 604800,
  }
);

async function _getC2Config(): Promise<Ic2Config> {
  // Sitecore item
  const C2APISettingsItemId = '{13DC9C82-D428-4DDB-845F-2712590E133E}';
  const C2APISettingsTemplateName = 'C2_API_Settings';

  let c2Config: Ic2Config = {
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
