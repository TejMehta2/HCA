import React from 'react';
import { BlogFilterListProps } from './BlogFilterList.types';
import styles from './BlogFilterList.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';

const BlogFilterList = (props: BlogFilterListProps): JSX.Element => {
  const { filters, clearFilters } = props;
  return (
    <div className={styles.wrapper}>
      {filters}
      <TextButton>
        <button onClick={clearFilters}>Clear filters</button>
      </TextButton>
    </div>
  );
};

export default BlogFilterList;
