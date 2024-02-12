import React from 'react';
import { BlogFilterListProps } from './BlogFilterList.types';
import styles from './BlogFilterList.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const BlogFilterList = (props: BlogFilterListProps): JSX.Element => {
  const { filters, clearFilters } = props;
  return (
    <div className={styles.wrapper}>
      {filters.map((filter, index) => (
        <Button key={index} size="small" theme="full-light-blue">
          <button onClick={() => clearFilters(index)}>
            <span>{filter}</span>
            <Icons iconName="iconCrossSmall" />
          </button>
        </Button>
      ))}
      <TextButton>
        <button onClick={() => clearFilters()}>Clear filters</button>
      </TextButton>
    </div>
  );
};

export default BlogFilterList;
