/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SearchDropdownProps {
  data: any;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownColumn1Label?: string;
  dropdownColumn2Label?: string;
}
