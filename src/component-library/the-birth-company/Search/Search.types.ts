/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SearchProps {
  placeholder: string;
  dropdownColumn1Label?: string;
  dropdownColumn2Label?: string;
  dropdownColumn1List?: any;
  dropdownColumn2List?: any;
}

export interface TbcServiceExtra {
  id: string;
  name: string;
  price: string; // Can be a number or percentage (e.g., "50%" or "60")
  duration: string; // Minutes
}

export interface TbcService {
  id: string;
  name: string;
  area: string;
  extras: TbcServiceExtra[];
}
