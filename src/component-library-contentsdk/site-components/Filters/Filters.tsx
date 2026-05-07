'use client';
import React, { useRef, type JSX } from 'react';
import { FiltersProps } from './Filters.types';
import styles from './Filters.module.scss';

import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Modals from '../../components/Modals/Modals';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Themes from '../../foundation/Themes/Themes';
import Accordions from '../../components/Accordions/Accordions';
import { useTranslations, useMessages } from 'next-intl';

const Filters = (props: FiltersProps): JSX.Element => {
  const {
    buttonText = (
      <span>
        <strong>Filter</strong> By
      </span>
    ),
    buttonIcon = <Icons iconName="iconFilterCircle" />,
    filters,
    resultsCount,
    submitOnClose,
    hideResultsCount = false,
  } = props;

  const messages = useMessages();
  const siteName = Object.keys(messages)[0] || 'sync';
  const t = useTranslations(siteName);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const clearFields = () => {
    // Clear all the checked input fields
    if (!dialogRef?.current) return;
    const fields = dialogRef.current.querySelectorAll('input:checked');
    fields?.forEach((field: HTMLInputElement, index) => {
      if (index === fields.length - 1) {
        field.click(); // interact with last field to trigger a form change event
      } else {
        field.checked = false; // update other fields without triggering form change event
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle}>
        <Button variation="full" size="large">
          <button
            onClick={() => {
              dialogRef.current?.showModal();
              dialogRef.current?.focus();
            }}
            type="button"
          >
            {buttonIcon}
            {buttonText}
          </button>
        </Button>
      </div>

      <Themes theme="A-HCA-White">
        <Modals
          ref={dialogRef}
          defaultOpen={false}
          variation="right"
          contentVariation="filters"
        >
          <div className={styles.header}>
            <Text variation="body-bold-extra-large">Filter By:</Text>
          </div>

          {filters && (
            <div className={styles.filters}>
              <Accordions
                openIcon="iconChevronDown"
                closeIcon="iconChevronUp"
                accordions={filters}
                isFilters={true}
              ></Accordions>
            </div>
          )}
          <div className={styles.footer}>
            <TextButton theme="dark">
              <button type="button" onClick={clearFields}>
                {t('clear-all') || 'Clear all'}
              </button>
            </TextButton>
            <Button variation="full-dark" size="small">
              <button
                onClick={() => dialogRef?.current?.close()}
                type={submitOnClose ? 'submit' : 'button'}
              >
                {!resultsCount || hideResultsCount
                  ? 'See Results'
                  : `See ${resultsCount} Results`}
              </button>
            </Button>
          </div>
        </Modals>
      </Themes>
    </div>
  );
};

export default Filters;
