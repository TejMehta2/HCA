import React, { useState, TouchEvent } from 'react';
import { ModalsProps } from './Modals.types';
import styles from './Modals.module.scss';
import SvgHandle from './assets/Handle.svg';
import TextButton from '../../core-components/TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';

// A toggle-able React Modal using the native HTML5 dialog element
// The modal has an animated drag and swipe behavior to mimic the typical mobile app draws that it resembles visually
const Modals = (props: ModalsProps): JSX.Element => {
  const {
    dialogRef,
    children,
    defaultOpen = false,
    variation = 'full',
  } = props;
  const {
    draggable,
    dragging,
    wrapper,
    overlay,
    modal,
    close,
    content,
    handle,
  } = styles;

  const Overlay = () => (
    <form method="dialog">
      {/* Opaque overlay button for closing modal on background click */}
      <button className={overlay} aria-hidden={true} />
    </form>
  );

  const CloseButton = () => (
    <div className={close}>
      <form method="dialog">
        <TextButton>
          <button>
            Close
            <Icons iconName="iconCross" />
          </button>
        </TextButton>
      </form>
    </div>
  );

  // Swipe/touch logic
  // Follows drag, and closes modal if downward swipe detected
  // Otherwise pings back to modal open position
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const minSwipeDistance = 200;
  const getShouldEnableDrag = (event: TouchEvent) => {
    // Avoid dragging when user trying to scroll down in scrollable content (e.g. filter list in content)
    // We determine if element is scrollable, and scrolled to top based on rects
    const target = event.target as HTMLDivElement;
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
    if (!touchStart || !touchPosition) return; // may be null if user was scrolling down content
    const distance = touchPosition - touchStart;
    const isDownSwipe = distance > minSwipeDistance;
    if (isDownSwipe) {
      // Close the dialog
      dialogRef?.current?.close();
    }
    // Reset touch states
    setTouchPosition(null);
    setTouchStart(null);
  };

  // THINK - should this swipe logic be a re-usable hook or component
  return (
    <dialog
      data-testid="dialog"
      ref={dialogRef}
      open={defaultOpen}
      className={wrapper}
    >
      <Overlay />
      <div
        className={[draggable, touchStart ? dragging : ''].join(' ')}
        style={{
          ['--touch-position' as string]: `${Math.max(
            0,
            touchPosition - touchStart
          )}px`,
        }}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
      >
        <div className={[modal, styles[variation]].join(' ')}>
          <div className={handle}>
            <SvgHandle />
          </div>
          <CloseButton />
          <div className={content}>{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default Modals;
