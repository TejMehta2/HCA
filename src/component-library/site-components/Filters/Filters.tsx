import React, { useRef } from 'react';
import { FiltersProps } from './Filters.types';
import styles from './Filters.module.scss';

import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Modals from '../../components/Modals/Modals';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import Accordions from '../../components/Accordions/Accordions';
import FiltersFooter from '../../components/FiltersFooter/FiltersFooter';

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
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle}>
        <Button variation="full-dark" size="large" contentVariation="search">
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

          <FiltersFooter
            resultsCount={resultsCount}
            dialogRef={dialogRef}
          ></FiltersFooter>
        </Modals>
      </Themes>
    </div>
  );
};

export default Filters;
