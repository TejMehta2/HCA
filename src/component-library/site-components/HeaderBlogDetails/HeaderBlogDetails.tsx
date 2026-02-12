import React, { useEffect, useState, useRef } from 'react';
import { HeaderBlogDetailsProps } from './HeaderBlogDetails.types';
import styles from './HeaderBlogDetails.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { useColumnSplitterContext } from '../../context/columnSplitterContext';

const HeaderBlogDetails = (props: HeaderBlogDetailsProps): JSX.Element => {
  const { theme, tag, date, title, bodyCopy } = props;
  const columnContext = useColumnSplitterContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasMultipleColumns, setHasMultipleColumns] = useState(false);

  useEffect(() => {
    // Try context first (from ColumnSplitter)
    if (columnContext?.hasMultipleColumns !== undefined) {
      setHasMultipleColumns(columnContext.hasMultipleColumns);
      return;
    }
  }, [columnContext]);

  // Debug logging (remove after testing)
  if (typeof window !== 'undefined') {
    console.log('HeaderBlogDetails - columnContext:', columnContext);
    console.log('HeaderBlogDetails - hasMultipleColumns:', hasMultipleColumns);
  }

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={`${hasMultipleColumns ? '' : styles.container}`}>
          <div className={styles.info}>
            {tag}
            {date}
          </div>
          <div className={styles.title}>{title}</div>
          {bodyCopy && <div className={styles.copy}>{bodyCopy}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default HeaderBlogDetails;
