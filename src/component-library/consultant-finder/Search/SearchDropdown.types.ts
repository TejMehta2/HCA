/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SearchDropdownProps {
  data: any;
  loading: boolean;
  noResults: boolean;
  noResultsMsg: string;
  error: boolean;
  setKeywordId?: React.Dispatch<React.SetStateAction<number>>;
  setSearchString?: React.Dispatch<React.SetStateAction<string>>;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowContinueBtn?: React.Dispatch<React.SetStateAction<boolean>>;
  resultsIcon: any;
  specialtyLabel?: string;
  conditionsProceduresLabel?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  searchStringConsultantName?: string;
  setSearchStringConsultantName?: React.Dispatch<React.SetStateAction<string>>;
  searchStringPayment?: string;
  setSearchStringPayment?: React.Dispatch<React.SetStateAction<string>>;
  insuranceProvidersFilterHeaderText?: string;
  searchConsultantsResultsHeaderText?: string;
  loadingText: string;
  nextLink?: string;
}
