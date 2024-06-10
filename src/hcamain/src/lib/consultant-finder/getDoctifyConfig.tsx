import { unstable_cache } from 'next/cache';
import { getItemFromGraphQL } from './getItemFromGraphQL';
import { revalidate } from './revalidateNow';

//Doctify APIs
export interface IDoctifyConfig {
  //Autocomplete
  aPI_Autocomplete_BaseURL: string;
  aPI_Autocomplete_Limit: string;
  aPI_Autocomplete_NoResultsMsg: string;
  aPI_Autocomplete_LoadingMsg: string;
  //DoctifySearch
  aPI_DoctifySearch_BaseURL: string;
  aPI_DoctifySearch_Limit: string;
  aPI_DoctifySearch_NoResultsMsg: string;
  aPI_DoctifySearch_LoadingMsg: string;
  //Insurance
  aPI_Insurance_BaseURL: string;
  aPI_Insurance_Limit: string;
  aPI_Insurance_NoResultsMsg: string;
  aPI_Insurance_LoadingMsg: string;
  //Specialists
  aPI_DoctifySpecialists_BaseURL: string;
  aPI_DoctifySpecialists_Limit: string;
  aPI_DoctifySpecialists_NoResultsMsg: string;
  aPI_DoctifySpecialists_LoadingMsg: string;
}

export async function GetDoctifyConfig(): Promise<IDoctifyConfig> {
  // revalidateTag('cacheGetDoctifyConfig'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await _getDoctifyConfig();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetDoctifyConfig cache revalidate flag:${revalidate.now()}`
    );
    return await _GetNCDoctifyConfig();
  } else {
    return await _GetDoctifyConfig();
  }
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _GetDoctifyConfig = unstable_cache(
  async (): Promise<IDoctifyConfig> => {
    console.log('refreshing _getDoctifyConfig from source..');
    const ret = await _getDoctifyConfig();
    // test possible return and throw to avoid caching bad results!
    if (ret.aPI_DoctifySearch_BaseURL?.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _GetDoctifyConfig`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetDoctifyConfig'],
    revalidate: 3600,
  }
);

const _GetNCDoctifyConfig = unstable_cache(
  async (): Promise<IDoctifyConfig> => {
    console.log('refreshing _getDoctifyConfig from source..');
    const ret = await _getDoctifyConfig();
    // test possible return and throw to avoid caching bad results!
    if (ret.aPI_DoctifySearch_BaseURL?.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _GetNCDoctifyConfig`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetDoctifyConfig'],
    revalidate: 1,
  }
);

async function _getDoctifyConfig(): Promise<IDoctifyConfig> {
  // Sitecore item
  const DoctifyAPISettingsItemId = '{D5945397-53E1-46FD-B36A-3C95AC3AEB81}';
  const DoctifyAPISettingsTemplateName = 'Doctify_API_Settings';

  let DoctifyConfig: IDoctifyConfig = {
    //Autocomplete
    aPI_Autocomplete_BaseURL: '',
    aPI_Autocomplete_Limit: '',
    aPI_Autocomplete_NoResultsMsg: '',
    aPI_Autocomplete_LoadingMsg: '',
    //DoctifySearch
    aPI_DoctifySearch_BaseURL: '',
    aPI_DoctifySearch_Limit: '',
    aPI_DoctifySearch_NoResultsMsg: '',
    aPI_DoctifySearch_LoadingMsg: '',
    //Insurance
    aPI_Insurance_BaseURL: '',
    aPI_Insurance_Limit: '',
    aPI_Insurance_NoResultsMsg: '',
    aPI_Insurance_LoadingMsg: '',

    //Specialists
    aPI_DoctifySpecialists_BaseURL: '',
    aPI_DoctifySpecialists_Limit: '',
    aPI_DoctifySpecialists_NoResultsMsg: '',
    aPI_DoctifySpecialists_LoadingMsg: '',
  };
  DoctifyConfig = await getItemFromGraphQL(
    DoctifyAPISettingsItemId,
    DoctifyAPISettingsTemplateName,
    DoctifyConfig
  );
  //console.log('DoctifyConfig result:', JSON.stringify(DoctifyConfig));
  return DoctifyConfig;
}
