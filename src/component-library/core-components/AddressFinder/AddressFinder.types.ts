export interface addressResult {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}
export interface AddressFinderProps {
  helpText?: string;
  addressResults?: addressResult[];
  isLoading: boolean;
  searchAddress: (term: string) => void;
  chosenAddress: (address: addressResult) => void;
}
