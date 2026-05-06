/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';

export interface ProgressBarProps {
  children?: ReactNode | JSX.Element;
  currentPage: null | string;
  steps: any;
  slug?: string;
  gmcNumber?: string;
  name?: string;
  reviewsTotal?: number | null;
}
