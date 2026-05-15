'use client';

import React, { forwardRef, useState, TouchEvent, type JSX } from 'react';
import { ModalsProps } from './Modals.types';
import styles from './Modals.module.scss';
import SvgHandle from './assets/Handle.svg';
import TextLink from '../../core-components/TextLink/TextLink';
import Icons from '../../foundation/Icons/Icons';
import { useTranslations } from 'next-intl';

// A toggle-able React Modal using the native HTML5 dialog element
// The modal has an animated drag and swipe behavior to mimic the typical mobile app draws that it resembles visually
const Modals = (
  props: ModalsProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const {
    children,
    defaultOpen = false,
    variation = 'full',
    contentVariation,
    id,
    alignContent,
  } = props;

  const {
    draggable,
    dragging,
    wrapper,
    // overlay,
    modal,
    close,
    content,
    handle,
  } = styles;

  const t = useTranslations();

  const Overlay = () => (
    <button
      data-focus-anchor="true"
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: 0,
        border: 0,
        overflow: 'hidden',
        clipPath: 'inset(50%)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      focus anchor
    </button>
  );

  const CloseButton = () => (
    <div className={close}>
      <TextLink>
        <button type="button" onClick={() => ref?.current?.close()}>
          <span>{t('close') || 'Close'}</span>
          <Icons iconName="iconCross" />
        </button>
      </TextLink>
    </div>
  );

  // Swipe/touch logic
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number>(0);
  const minSwipeDistance = 200;

  const getShouldEnableDrag = (event: TouchEvent) => {
    const target = event.target as HTMLDivElement;
    if (!target?.parentElement) return;
    const { top: parentTop, height: parentHeight } =
      target.parentElement.getBoundingClientRect();
    const { top, height } = target.getBoundingClientRect();
    return height === parentHeight || top === parentTop;
  };

  const touchStartHandler = (event: TouchEvent) => {
    const shouldEnableDrag = getShouldEnableDrag(event);
    if (!shouldEnableDrag) return;
    setTouchPosition(event.targetTouches[0].clientY);
    setTouchStart(event.targetTouches[0].clientY);
  };

  const touchMoveHandler = (event: TouchEvent) => {
    const shouldEnableDrag = getShouldEnableDrag(event);
    if (!shouldEnableDrag || !touchStart) return;
    setTouchPosition(event.targetTouches[0].clientY);
  };

  const touchEndHandler = () => {
    if (!touchStart || !touchPosition) return;
    const distance = touchPosition - touchStart;
    const isDownSwipe = distance > minSwipeDistance;

    if (isDownSwipe) {
      ref?.current?.close();
    }

    setTouchPosition(0);
    setTouchStart(0);
  };

  const touchHandlers = {
    onTouchStart: touchStartHandler,
    onTouchMove: touchMoveHandler,
    onTouchEnd: touchEndHandler,
  };

  const spreadProps = variation === 'right' ? {} : touchHandlers;

  return (
    <dialog
      id={id}
      data-testid="dialog"
      ref={ref}
      open={defaultOpen}
      tabIndex={-1}
      className={[wrapper, contentVariation && styles[contentVariation]]
        .filter(Boolean)
        .join(' ')}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          ref?.current?.close();
        }
      }}
    >
      <Overlay />

      <div
        className={[styles[variation], draggable, touchStart ? dragging : '']
          .filter(Boolean)
          .join(' ')}
        style={{
          ['--touch-position' as string]: `${Math.max(
            0,
            touchPosition - touchStart
          )}px`,
        }}
        {...spreadProps}
      >
        <div className={modal}>
          <div className={handle}>
            <SvgHandle />
          </div>
          <CloseButton />
          <div
            className={[
              content,
              alignContent === 'center' ? styles['center-align'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {children}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default forwardRef(Modals);
