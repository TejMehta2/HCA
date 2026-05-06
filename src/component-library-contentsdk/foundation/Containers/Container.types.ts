import { ReactNode } from 'react';

export default interface ConatinerProps {
  children: ReactNode | JSX.Element;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  displayFlex?: string;
  width?: string;
  withButtons?: boolean;
  customBtn?: boolean;
  customBtnDesktop?: boolean;
  gridLayout?: boolean;
  alignItems?: 'center-align';
}
