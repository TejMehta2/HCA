import { getItemFromGraphQL } from './getItemFromGraphQL';

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
}

export async function getHCAConfig(): Promise<IHCAConfig> {
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
  };

  HCAConfig = await getItemFromGraphQL(
    HCAAPISettingsItemId,
    HCAAPISettingsTemplateName,
    HCAConfig
  );
  //console.log('HCAConfig result:', JSON.stringify(HCAConfig));
  return HCAConfig;
}
