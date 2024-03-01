import { getItemFromGraphQL } from './getItemFromGraphQL';

//HCA APIs
interface IHCAConfig {
  //HCA API - Doctify To Facilities Lookup
  aPI_HCA_DoctifyToFacilities_BaseURL: string;
  aPI_HCA_DoctifyToFacilities_NoResultsMsg: string;
  aPI_HCA_DoctifyToFacilities_LoadingMsg: string;
  aPI_HCA_DoctifyToFacilities_UtilizesLegacy: boolean;

  //HCA API - Live diary Online consultant booking Consultants
  aPI_HCA_LDB_Consultants_BaseURL: string;
  aPI_HCA_LDB_Consultants_NoResultsMsg: string;
  aPI_HCA_LDB_Consultants_LoadingMsg: string;
  aPI_HCA_LDB_Consultants_UtilizesLegacy: boolean;


  //HCA API - All Consultants
  aPI_HCA_All_Consultants_BaseURL: string;
  aPI_HCA_All_Consultants_NoResultsMsg: string;
  aPI_HCA_All_Consultants_LoadingMsg: string;
  aPI_HCA_All_Consultants_UtilizesLegacy: boolean;
}

export async function getHCAConfig(): Promise<IHCAConfig> {
  // Sitecore item
  const HCAAPISettingsItemId = '{AF16E5CB-FE0D-4412-A299-96BEF3F5E363}';
  const HCAAPISettingsTemplateName = 'HCA_API_Settings';

  let HCAConfig: IHCAConfig = {
    //HCA API - Doctify To Facilities Lookup
    aPI_HCA_DoctifyToFacilities_BaseURL: "",
    aPI_HCA_DoctifyToFacilities_NoResultsMsg: "",
    aPI_HCA_DoctifyToFacilities_LoadingMsg: "",
    aPI_HCA_DoctifyToFacilities_UtilizesLegacy: true,

    //HCA API - Live diary Online consultant booking Consultants
    aPI_HCA_LDB_Consultants_BaseURL: "",
    aPI_HCA_LDB_Consultants_NoResultsMsg: "",
    aPI_HCA_LDB_Consultants_LoadingMsg: "",
    aPI_HCA_LDB_Consultants_UtilizesLegacy: true,

    //HCA API - All Consultants
    aPI_HCA_All_Consultants_BaseURL: "",
    aPI_HCA_All_Consultants_NoResultsMsg: "",
    aPI_HCA_All_Consultants_LoadingMsg: "",
    aPI_HCA_All_Consultants_UtilizesLegacy: true,
  };
  HCAConfig = await getItemFromGraphQL(HCAAPISettingsItemId, HCAAPISettingsTemplateName, HCAConfig);
  //console.log('HCAConfig result:', JSON.stringify(HCAConfig));
  return HCAConfig;
}
