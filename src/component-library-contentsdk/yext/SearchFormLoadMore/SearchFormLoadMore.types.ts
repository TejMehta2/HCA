import { ReactNode, type JSX } from 'react';

export interface SearchFormLoadMoreProps {
  defaultLimit: number;
  limit: number;
  resultsCount: number;
  children: JSX.Element | ReactNode;
}
