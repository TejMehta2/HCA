import React, { useRef } from 'react';
import { FiltersProps } from './Filters.types';
import styles from './Filters.module.scss';

import Button from '../../core-components/Button/Button';
import TextLink from '../../core-components/TextLink/TextLink';
import Icons from '../../foundation/Icons/Icons';
import Modals from '../Modals/Modals';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Themes from '../../foundation/Themes/Themes';

const Filters = (props: FiltersProps): JSX.Element => {
  const { children } = props;

  const dialogRef = useRef<HTMLDialogElement>();

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

          <div className={styles.filters}>{children}</div>

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
