import React, { useRef, useState, useEffect, useId, type JSX } from 'react';
import { TooltipsProps } from './Tooltips.types';
import styles from './Tooltips.module.scss';
import Icons from '../../foundation/Icons/Icons';

const Tooltips = (props: TooltipsProps): JSX.Element => {
  const { display = 'block', children, theme } = props;

  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTrigger = useRef<HTMLButtonElement>(null);
  const tooltipContentId = useId();

  const [offsetLeft, setOffsetLeft] = useState(false);
  const [offsetRight, setOffsetRight] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const tooltipContent = tooltipRef?.current;
    //  dividing by 2 as it only needs space for half of the content width to display in the centre
    const tooltipContentWidth =
      tooltipContent && tooltipContent.offsetWidth / 2;
    const screenWidth = window.innerWidth;
    //  get distance from left to the trigger button
    const offsetLeft = tooltipContent?.getBoundingClientRect().left;

    //  gets distance from left including the trigger
    const getBoundingRight = tooltipContent?.getBoundingClientRect().right;

    //  get distance from right
    const offsetRight = getBoundingRight && screenWidth - getBoundingRight;

    if (tooltipContentWidth && offsetLeft && offsetRight) {
      if (
        tooltipContentWidth < offsetLeft ||
        tooltipContentWidth < offsetRight
      ) {
        setOffsetRight(offsetRight < tooltipContentWidth);

        setOffsetLeft(offsetLeft < tooltipContentWidth);
      }
    }
  }, [isActive]);

  const clickHandler = () => {
    setIsActive(!isActive);
  };

  const themeOverride = theme
    ? theme !== 'dark'
      ? styles.light
      : styles.dark
    : '';

  return (
    <div
      className={[
        styles.wrapper,
        styles[display],
        themeOverride,
        offsetLeft ? styles.left : '',
        offsetRight ? styles.right : '',
      ].join(' ')}
    >
      {isActive && (
        <div
          aria-hidden={true}
          className={styles.backdrop}
          onClick={() => {
            setIsActive(false);
          }}
        />
      )}
      <button
        className={styles.button}
        onClick={clickHandler}
        ref={tooltipTrigger}
        aria-label="More Information"
        aria-describedby={tooltipContentId}
      >
        <span className={styles.icon}>
          <Icons iconName="iconInfo"></Icons>
        </span>
        <span className="sr-only">{isActive ? 'open' : 'close'} tooltip</span>
      </button>
      <div
        className={[styles.content, styles[isActive ? 'active' : '']].join(' ')}
        ref={tooltipRef}
        id={tooltipContentId}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltips;
