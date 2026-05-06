import React, { type JSX } from 'react';
import { FiltersFooterProps } from './FiltersFooter.types';
import styles from './FiltersFooter.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';
import Button from '../../core-components/Button/Button';

const FiltersFooter = (props: FiltersFooterProps): JSX.Element => {
  const { resultsCount, dialogRef } = props;

  const clearFields = () => {
    // Clear all the checked input fields
    if (!dialogRef?.current) return;
    const fields = dialogRef.current.querySelectorAll('input:checked');
    fields?.forEach((field: HTMLInputElement, index: number) => {
      if (index === fields.length - 1) {
        field.click(); // interact with last field to trigger a form change event
      } else {
        field.checked = false; // update other fields without triggering form change event
      }
    });
  };

  return (
    <div className={styles.footer}>
      <TextButton theme="dark">
        <button type="button" onClick={clearFields}>
          Clear All
        </button>
      </TextButton>
      <Button variation="full-dark" size="small">
        <button onClick={() => dialogRef?.current?.close()} type="button">
          See {resultsCount} Results
        </button>
      </Button>
    </div>
  );
};

export default FiltersFooter;
