import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';
import CardGrid from '../CardGrid/CardGrid';

const Pagination = (props: PaginationProps): JSX.Element => {
  const { theme, pageCount, currentPage = 1, data, callback } = props;
  const [page, setPage] = useState(currentPage);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [pageContent, setPageContent] = useState(data);
  const [pageButtons, setPageButtons] = useState<JSX.Element[]>();

  /* changing page */
  const pageChangeHandler = useCallback(
    (newPage: number) => {
      /* dont run if going above or below min & max pages */
      if (newPage < 1 || newPage > pageCount) {
        return;
      }

      /* Set new page and fetch new page content */
      setPage(newPage);
      setPageContent(callback(newPage));
    },
    [pageCount, callback]
  );

  /* Individual page button */
  const generateButton = useCallback(
    (number: number) => {
      return (
        <button
          key={number}
          onClick={() => pageChangeHandler(number)}
          className={`${styles['number']} ${
            number === page ? styles['current-page'] : ''
          }`}
        >
          {number}
        </button>
      );
    },
    [page, pageChangeHandler]
  );

  /* Create page buttons */
  const paginationHandler = useCallback(
    (current: number, max: number) => {
      if (!current || !max) {
        return;
      }

      /* There will always be at least 1 page */
      const items = [generateButton(1)];

      /* If only one page, return */
      if (current === 1 && max === 1) {
        return;
      }

      /* Append an ellipsis if current page is greater than 3 */
      if (current > 3 && max > 4) {
        items.push(<span key={'span' + (current - 2)}>...</span>);
      }

      /* Range is the amount of pages that is shown on either side of the current page. 
      This is always 1 unless near the start or end of page list */
      let range = 1;

      if (current === 1 || current === max) {
        range = 3;
      } else if (current === 2 || current === max - 1) {
        range = 2;
      }

      /* Lower range */
      const r1 = current - range;

      /* Upper range */
      const r2 = current + range;

      /* create buttons for all buttons which should be visible */
      for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
        items.push(generateButton(i));
      }

      /* Append another ellipsis if current page is more than 1 number away from the highest page */
      if (r2 + 1 < max) {
        items.push(<span key={'span' + (current + 2)}>...</span>);
      }

      /* Generate last page */
      if (r2 < max) {
        items.push(generateButton(max));
      }

      /* Set page buttons array with new list of visible pages */
      setPageButtons(items);

      return;
    },
    [generateButton]
  );

  /* Get OffsetLeft of current page so that background can be positioned correctly */
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const currentElements = Array.from(containerRef.current!.children);

    if (currentElements === null) {
      return;
    }

    currentElements?.map((buttonElement: HTMLElement) => {
      if (buttonElement.classList.contains(styles['current-page'])) {
        setOffsetLeft(buttonElement.offsetLeft);
      }
    });
  }, [containerRef, pageButtons]);

  useEffect(() => {
    paginationHandler(page, pageCount);
  }, [page, pageCount, paginationHandler]);

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.buttons}
            ref={containerRef}
            style={{
              // consumed in the CSS to animate the background element
              ['--current-page-offset-left' as string]: `${offsetLeft}px`,
            }}
          >
            <button
              className={`${styles['arrow']} ${
                page === 1 ? styles['hide'] : ''
              }`}
              onClick={() => pageChangeHandler(page - 1)}
            >
              <Icons iconName="iconArrowSmallLeft" />
            </button>
            {pageButtons}
            <button
              className={`${styles['arrow']} ${
                page === pageCount ? styles['hide'] : ''
              }`}
              onClick={() => pageChangeHandler(page + 1)}
            >
              <Icons iconName="iconArrowSmallRight" />
            </button>
          </div>
          <div>
            <CardGrid theme={theme}>{pageContent}</CardGrid>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default Pagination;
