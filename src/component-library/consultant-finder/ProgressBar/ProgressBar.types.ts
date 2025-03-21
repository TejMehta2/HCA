/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface ProgressBarProps {
  children?: ReactNode | JSX.Element;
  currentPage: null | string;
  steps: any;
  slug?: string;
  gmcNumber?: string;
  reviewsTotal?: number | null;
  tbc?: boolean;
}
