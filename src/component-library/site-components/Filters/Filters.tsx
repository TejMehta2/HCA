import React, { useRef, useState, useEffect } from 'react';
import { FiltersProps } from './Filters.types';
import styles from './Filters.module.scss';

import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Modals from '../../components/Modals/Modals';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Themes from '../../foundation/Themes/Themes';
import Accordions from '../Accordions/Accordions';

const Filters = (props: FiltersProps): JSX.Element => {
  const { filters } = props;

  const dialogRef = useRef<HTMLDialogElement>();

  const [filterAccordions, setFilterAccordions] = useState();

  useEffect(() => {
    const showMoreButton = (
      <TextButton theme="dark">
        <button
          onClick={() => {
            console.log('show more');
          }}
        >
          <span>Show More</span>
          <Icons iconName="iconPlus"></Icons>
        </button>
      </TextButton>
    );

    const updatedFilters = filters?.map((filter) => {
      const filterItems = filter.children.props.children;

      if (filterItems.length > 6) {
        const nextIndex = filterItems.length;
        const updatedChildren = { ...filterItems, [nextIndex]: showMoreButton };

        return { ...filter, children: updatedChildren };
      } else {
        return { ...filter, children: filterItems };
      }
    });

    console.log(filters);
    console.log(updatedFilters);

    setFilterAccordions(updatedFilters);
  }, [filters]);

  return (
    <div className={styles.wrapper}>
      <Button theme="full-dark" size="large">
        <button onClick={() => dialogRef?.current?.showModal()}>
          <Icons iconName="iconFilterCircle" />
          <span>
            <strong>Filter</strong> By
          </span>
        </button>
      </Button>

      <Themes theme="f">
        <Modals ref={dialogRef} defaultOpen={false} variation="right">
          <div className={styles.header}>
            <Text variation="body-semi-bold-extra-large">Filter By:</Text>
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
              <button>Clear All</button>
            </TextButton>
            <Button theme="full-dark" size="small">
              <button onClick={() => dialogRef?.current?.close()}>
                See XX Results
              </button>
            </Button>
          </div>
        </Modals>
      </Themes>
    </div>
  );
};

export default Filters;
