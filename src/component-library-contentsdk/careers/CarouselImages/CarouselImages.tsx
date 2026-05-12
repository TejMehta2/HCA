'use client';
import React, { useEffect, useRef, useState, type JSX } from 'react';
import { CarouselImagesProps } from './CarouselImages.types';
import styles from './CarouselImages.module.scss';
import { generateHtmlSafeId } from '../../utility-functions';

const CarouselImages = (props: CarouselImagesProps): JSX.Element => {
  const { images, contentVariation, id, tableOfContentTitle } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [startDragClientX, setStartDragClientX] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [lastScroll, setLastScroll] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set default scroll position to be 50%
  useEffect(() => {
    const refCurrent = wrapperRef.current;

    if (!refCurrent) return;

    refCurrent.scrollLeft = (refCurrent.scrollWidth - window.innerWidth) / 2;
  }, []);

  useEffect(() => {
    const refCurrent = wrapperRef.current;

    const handleScroll = () => {
      if (!refCurrent) return;

      const scrollTop = window.scrollY;
      const elementOffsetTop = refCurrent.offsetTop;

      const appearsOnScreen = elementOffsetTop - window.innerHeight;
      const leavesScreen = refCurrent.offsetHeight + elementOffsetTop;

      if (scrollTop > appearsOnScreen && scrollTop < leavesScreen) {
        if (scrollTop > lastScroll) {
          refCurrent.scrollLeft += 2;
        } else {
          refCurrent.scrollLeft -= 2;
        }
      }

      setLastScroll(scrollTop);
    };

    if (refCurrent) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (refCurrent) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScroll]);

  const mouseDown = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;

    setIsDragging(true);
    setStartDragClientX(e.pageX - wrapperRef.current.offsetLeft);
    setTranslateX(wrapperRef.current.scrollLeft);
  };

  const mouseUp = () => {
    setIsDragging(false);
  };

  const mouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = x - startDragClientX;
    wrapperRef.current.scrollLeft = translateX - walk;
  };

  let linkTableOfContentId;
  let linkTableOfContentTitle;

  if (tableOfContentTitle) {
    linkTableOfContentTitle = tableOfContentTitle;
    linkTableOfContentId = generateHtmlSafeId(tableOfContentTitle);
  }

  return (
    <div
      id={id}
      {...(tableOfContentTitle
        ? { 'data-subnav-link-title': linkTableOfContentTitle }
        : {})}
      {...(tableOfContentTitle
        ? { 'data-subnav-link-id': linkTableOfContentId }
        : {})}
      className={[
        styles.wrapper,
        contentVariation === 'equalSize' && styles['equal-size'],
      ].join(' ')}
      ref={wrapperRef}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
      onMouseLeave={mouseUp}
    >
      <div className={styles.container}>
        {images.map((image, index) => (
          <div className={styles.image} key={index}>
            {image}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselImages;
