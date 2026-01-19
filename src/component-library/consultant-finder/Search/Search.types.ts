/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SearchProps {
  placeholder: string;
  doctifyBaseURL: string;
  doctifySearchBaseURL?: string;
  limit: number;
  noResultsMsg: string;
  specialtyLabel?: string;
  conditionsProceduresLabel?: string;
  searchString?: string;
  setSearchString?: React.Dispatch<React.SetStateAction<string>>;
  setKeywordId?: React.Dispatch<React.SetStateAction<number>>;
  setShowContinueBtn?: React.Dispatch<React.SetStateAction<boolean>>;
  searchIcon: any;
  searchIconResults?: any;
  conditionsTreatmentsList?: any;
  specialitiesList?: any;
  searchStringConsultantName?: string;
  setSearchStringConsultantName?: React.Dispatch<React.SetStateAction<string>>;
  popularConsultantsList?: any;
  searchStringPayment?: string;
  setSearchStringPayment?: React.Dispatch<React.SetStateAction<string>>;
  insuranceProvidersFilterHeaderText?: string;
  insurersList?: any;
  searchConsultantsResultsHeaderText?: string;
  loadingText: string;
  nextLink?: string;
}
