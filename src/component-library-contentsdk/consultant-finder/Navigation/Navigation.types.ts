import { ReactNode } from 'react';

export default interface NavigationProps {
  children: ReactNode | JSX.Element;
  showOnMobile?: boolean;
  hasCustomBtnMobile?: boolean;
  hideTextMobile?: boolean;
  hideOnDesktop?: boolean;
}
