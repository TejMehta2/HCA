import { getItemFromGraphQL } from './getItemFromGraphQL';

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

export async function getDoctifyConfig(): Promise<IDoctifyConfig> {
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
