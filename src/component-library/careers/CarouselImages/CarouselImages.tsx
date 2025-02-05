import React, { useEffect, useRef, useState } from 'react';
import { CarouselImagesProps } from './CarouselImages.types';
import styles from './CarouselImages.module.scss';
import { useDebouncedCallback } from 'use-debounce';

const CarouselImages = (props: CarouselImagesProps): JSX.Element => {
  const { images } = props;
  const [translateX, setTranslateX] = useState<number>(0);
  const [componentWidth, setComponentWidth] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    if (!wrapperRef.current) return;

    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const elementOffsetTop = wrapperRef.current.offsetTop;
    const elementHeight = wrapperRef.current.offsetHeight;

    const appearsOnScreen = elementOffsetTop - window.innerHeight;
    const leavesScreen = wrapperRef.current.offsetHeight + elementOffsetTop;

    // Calculate percentage up the screen that the component is currently at
    const distance = scrollTop + viewportHeight - elementOffsetTop;
    const percentage = Math.round(
      distance / ((viewportHeight + elementHeight) / 100)
    );

    // Limit percentage to 0-100 and divide by 2 so that there isn't lots of white space when near the bottom of scroll
    const percentageLimited = Math.min(100, Math.max(0, percentage));

    const translateX =
      Math.min(componentWidth - window.innerWidth, 350) *
      (percentageLimited / 100);
    /* console.log(
      componentWidth - window.innerWidth,
      translateX,
      percentageLimited
    ); */

    // Adjust X position if currently within viewport
    if (window.scrollY >= appearsOnScreen && window.scrollY <= leavesScreen) {
      setTranslateX(translateX);
    }
  };

  const sideScrollSetup = useDebouncedCallback(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
  }, 100);

  /* Handle translateX of component. This will update whenever screen size changes */
  useEffect(() => {
    if (!wrapperRef.current) return;
    setComponentWidth(wrapperRef.current.scrollWidth);

    sideScrollSetup();

    /* Rerun setup on resize as the translateX will need to update */
    window.addEventListener('resize', sideScrollSetup);
    return () => window.removeEventListener('resize', sideScrollSetup);
  }, [sideScrollSetup]);

  return (
    <>
      <div className={styles['dummy-component']}>
        EXAMPLE PREVIOUS COMPONENT
      </div>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div
          className={styles.container}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {images.map((image, index) => (
            <div className={styles.image} key={index}>
              {image}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['dummy-component']}>EXAMPLE NEXT COMPONENT</div>
    </>
  );
};

export default CarouselImages;
