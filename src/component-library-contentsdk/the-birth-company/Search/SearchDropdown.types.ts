import { TbcDropdownColumn } from './Search.types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SearchDropdownProps {
  data: TbcDropdownColumn[][];
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownColumn1Label?: string;
  dropdownColumn2Label?: string;
}
