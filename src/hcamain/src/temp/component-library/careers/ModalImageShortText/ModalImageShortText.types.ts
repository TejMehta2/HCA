import { ReactNode } from 'react';

export interface ModalImageShortTextProps {
  defaultOpen?: boolean;
  header: ReactNode | JSX.Element;
  image: ReactNode | JSX.Element;
  subheader: ReactNode | JSX.Element;
  copy: ReactNode | JSX.Element;
}
