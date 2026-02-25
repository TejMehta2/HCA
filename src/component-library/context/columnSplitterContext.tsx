import { createContext, useContext } from 'react';

export const ColumnSplitterContext = createContext<{
  hasMultipleColumns: boolean;
} | null>(null);

export const useColumnSplitterContext = () => {
  const context = useContext(ColumnSplitterContext);
  return context;
};
