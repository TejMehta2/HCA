/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, type JSX } from 'react';
import { useRouter } from 'next/router';
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
    const {
      offset,
      language,
      insurer,
      gender,
      videoConsultation,
      practice,
      requestPath,
      ...queryParams
    } = router.query;

    const newQueryParams: any = { ...queryParams };

    // Remove search if it exists
    if ('search' in newQueryParams) {
      delete newQueryParams.search;
    }

    // Remove keywordId if it exists
    if ('keywordId' in newQueryParams) {
      delete newQueryParams.keywordId;
    }

    // Remove language if it exists
    if ('language' in newQueryParams) {
      delete newQueryParams.language;
    }

    // Remove insurer if it exists
    if ('insurer' in newQueryParams) {
      delete newQueryParams.insurer;
    }

    // Remove gender if it exists
    if ('gender' in newQueryParams) {
      delete newQueryParams.gender;
    }

    // Remove videoConsultation if it exists
    if ('videoConsultation' in newQueryParams) {
      delete newQueryParams.videoConsultation;
    }

    // Remove practice if it exists
    if ('practice' in newQueryParams) {
      delete newQueryParams.practice;
    }

    // Update offset and sortBy to their default values
    newQueryParams.offset = 0;
    newQueryParams.sortType = 'relevance';

    router.push(
      {
        pathname: router.pathname,
        query: newQueryParams,
      },
      undefined,
      { shallow: true }
    );
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
