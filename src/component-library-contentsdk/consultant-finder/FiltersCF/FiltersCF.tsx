'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, type JSX } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiltersProps } from '../../site-components/Filters/Filters.types';
import styles from '../../site-components/Filters/Filters.module.scss';

import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Modals from '../../components/Modals/Modals';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Themes from '../../foundation/Themes/Themes';
import Accordions from '../../components/Accordions/Accordions';

const Filters = (props: FiltersProps): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    buttonText = (
      <span>
        <strong>Filter</strong> By
      </span>
    ),
    buttonIcon = <Icons iconName="iconFilterCircle" />,
    filters,
    resultsCount,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const clearFields = () => {
    const newQueryParams = new URLSearchParams(searchParams.toString());
    [
      'offset',
      'language',
      'insurer',
      'gender',
      'videoConsultation',
      'practice',
      'requestPath',
      'search',
      'keywordId',
    ].forEach((key) => newQueryParams.delete(key));

    newQueryParams.set('offset', '0');
    newQueryParams.set('sortType', 'relevance');

    const queryString = newQueryParams.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle}>
        <Button variation="full-dark" size="large">
          <button onClick={() => dialogRef.current?.showModal()} type="button">
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
              ></Accordions>
            </div>
          )}

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
        </Modals>
      </Themes>
    </div>
  );
};

export default Filters;
