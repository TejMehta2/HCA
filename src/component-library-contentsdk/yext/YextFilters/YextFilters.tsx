import React, { useRef, type JSX } from 'react';
import { YextFiltersProps } from './YextFilters.types';
import styles from './YextFilters.module.scss';
import Modals from '../../components/Modals/Modals';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import useWindowWidth from '../../hooks/useWindowWidth';
import FiltersFooter from '../../components/FiltersFooter/FiltersFooter';

const YextFilters = (props: YextFiltersProps): JSX.Element => {
  const {
    children,
    label = 'Filter by:',
    mobileLabel = 'Filter by',
    buttonIcon = <Icons iconName="iconFilterCircle" />,
    filtersTitle,
    resultsCount,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const isL = useWindowWidth(1135);

  return (
    <div className={styles.wrapper}>
      {isL ? (
        <div className={styles.desktop}>
          <div className={styles.label}>{label}</div>
          <div className={styles.filters}>{children}</div>
        </div>
      ) : (
        <div className={styles.mobile}>
          <div className={styles.toggle}>
            <Button variation="full" size="large">
              <button
                onClick={() => dialogRef.current?.showModal()}
                type="button"
              >
                {buttonIcon}
                {mobileLabel}
              </button>
            </Button>
          </div>
          <Modals
            ref={dialogRef}
            defaultOpen={false}
            contentVariation="filters"
          >
            <div className={styles.label}>{mobileLabel}</div>

            <div className={styles.filters}>
              <div className={styles['filters-title']}>{filtersTitle}</div>
              {children}
            </div>

            <FiltersFooter
              resultsCount={resultsCount}
              dialogRef={dialogRef}
            ></FiltersFooter>
          </Modals>
        </div>
      )}
    </div>
  );
};

export default YextFilters;
