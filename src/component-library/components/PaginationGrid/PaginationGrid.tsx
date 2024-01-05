import React, { useRef, useState } from 'react';
import { PaginationGridProps } from './PaginationGrid.types';
import CardGrid from '../CardGrid/CardGrid';
import Pagination from '../../core-components/Pagination/Pagination';

const PaginationGrid = (props: PaginationGridProps): JSX.Element => {
  const { theme, data, pageCount, getPageContent } = props;
  const [pageContent, setPageContent] = useState<JSX.Element[]>(data);
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={componentRef}>
      <CardGrid theme={theme}>{pageContent}</CardGrid>
      <Pagination
        theme={theme}
        pageCount={pageCount}
        callback={(newPage: number) => {
          setPageContent(getPageContent(newPage));
          /* Scroll to top of component */
          if (componentRef.current) {
            componentRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
};

export default PaginationGrid;
