import React from 'react';
import { SearchFilterListProps } from './SearchFilterList.types';
import styles from './SearchFilterList.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const SearchFilterList = (props: SearchFilterListProps): JSX.Element => {
  const { filters, clearFilters } = props;
  if (!filters?.length) return <></>;
  return (
    <div className={styles.wrapper}>
      {filters.map(({ id, label }) => (
        <Button key={`filter-clear-${id}`} size="large" variation="filter">
          <button
            onClick={() => {
              const field = document.getElementById(id) as HTMLInputElement;
              field?.click();
            }}
            type="button"
          >
            <span>{label}</span>
            <span>
              <Icons iconName="iconCrossSmall" />
            </span>
          </button>
        </Button>
      ))}
      <TextButton>
        <button onClick={() => clearFilters()} type="button">
          Clear filters
        </button>
      </TextButton>
    </div>
  );
};

export default SearchFilterList;
