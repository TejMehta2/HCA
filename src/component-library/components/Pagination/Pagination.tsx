import React, { useEffect, useState } from 'react';
import { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';

const Pagination = (props: PaginationProps): JSX.Element => {
  const { theme, itemsPerPage, currentPage = 1, element } = props;
  const [page, setPage] = useState(currentPage);
  const [pageButtons, setPageButtons] = useState<JSX.Element[]>();

  const totalItems = element.props.children.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const paginationHandler = (current: number, max: number) => {
    if (!current || !max) {
      return;
    }

    const items = [
      <button
        key={1}
        onClick={() => setPage(1)}
        className={`${styles['number']} ${
          1 === current ? styles['current-page'] : ''
        }`}
      >
        1
      </button>,
    ];

    //console.log(pageButtons, max, items);

    if (current === 1 && max === 1) {
      return;
    }

    if (current > 3) {
      items.push(<span key={current - 2}>...</span>);
    }

    let range = 1;

    if (
      current === 1 ||
      current === 2 ||
      current === max ||
      current === max - 1
    ) {
      range = 2;
    }

    const r1 = current - range;
    const r2 = current + range;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
      items.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`${styles['number']} ${
            i === current ? styles['current-page'] : ''
          }`}
        >
          {i}
        </button>
      );
    }

    if (r2 + 1 < max) {
      items.push(<span key={current + 2}>...</span>);
    }

    if (r2 < max) {
      items.push(
        <button
          key={max}
          onClick={() => setPage(max)}
          className={`${styles['number']} ${
            max === current ? styles['current-page'] : ''
          }`}
        >
          {max}
        </button>
      );
    }

    console.log(items);
    setPageButtons(items);

    return;
  };

  useEffect(() => {
    paginationHandler(page, pageCount);
  }, [page, pageCount]);

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {page > 1 && (
            <button
              className={styles['arrow']}
              onClick={() => setPage(page - 1)}
            >
              <Icons iconName="iconArrowLeft" />
            </button>
          )}
          {pageButtons}
          {page < pageCount && (
            <button
              className={styles['arrow']}
              onClick={() => setPage(page + 1)}
            >
              <Icons iconName="iconArrowRight" />
            </button>
          )}
        </div>
        <div>{element}</div>
      </div>
    </Themes>
  );
};

export default Pagination;
