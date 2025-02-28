import React, { useEffect, useRef, useState } from 'react';
import { CarouselImagesProps } from './CarouselImages.types';
import styles from './CarouselImages.module.scss';
//import { useDebouncedCallback } from 'use-debounce';

const CarouselImages = (props: CarouselImagesProps): JSX.Element => {
  const { images } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [startDragClientX, setStartDragClientX] = useState<number>(0);
  //const [startDragTranslateX, setStartDragTranslateX] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [lastScroll, setLastScroll] = useState<number>(0);
  //const [componentWidth, setComponentWidth] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*   const scrollHandler = () => {
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

    const newTranslateX =
      Math.min(componentWidth - document.documentElement.clientWidth, 350) *
      (percentageLimited / 100);

    console.log(
      componentWidth,
      document.documentElement.clientWidth,
      translateX,
      newTranslateX,
      percentageLimited
    );

    // Adjust X position if currently within viewport
    if (window.scrollY >= appearsOnScreen && window.scrollY <= leavesScreen) {
      setTranslateX(newTranslateX);
    }
  };

  const sideScrollSetup = useDebouncedCallback(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
  }, 100);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!wrapperRef.current) return;

    let clientX = 0;
    if (e.type === 'mousedown') {
      clientX = (e as React.MouseEvent).clientX;
    } else if (e.type === 'touchstart') {
      clientX = (e as React.TouchEvent).touches[0].clientX;
    }

    setIsDragging(true);
    setStartDragClientX(clientX);
    setStartDragTranslateX(translateX);
    wrapperRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !wrapperRef.current) return;

    let clientX = 0;
    if (e.type === 'mousemove') {
      clientX = (e as React.MouseEvent).clientX;
    } else if (e.type === 'touchmove') {
      clientX = (e as React.TouchEvent).touches[0].clientX;
    }

    const moveX = clientX - startDragClientX;
    const newTranslateX = startDragTranslateX - moveX;

    //console.log(moveX, newTranslateX);

    if (
      newTranslateX <= 0 ||
      newTranslateX >= componentWidth - document.documentElement.clientWidth + 0
    )
      return;

    setTranslateX(newTranslateX);
  };

  const handleMouseUp = () => {
    if (!wrapperRef.current) return;
    setIsDragging(false);
    wrapperRef.current.style.cursor = 'grab';
  };

  // Handle translateX of component. This will update whenever screen size changes
  useEffect(() => {
    if (!wrapperRef.current) return;
    setComponentWidth(wrapperRef.current.scrollWidth);

    sideScrollSetup();

    // Rerun setup on resize as the translateX will need to update
    window.addEventListener('resize', sideScrollSetup);
    return () => window.removeEventListener('resize', sideScrollSetup);
  }, [sideScrollSetup]); */

  useEffect(() => {
    const refCurrent = wrapperRef.current;

    const handleScroll = () => {
      if (!refCurrent) return;

      const scrollTop = window.scrollY;
      const elementOffsetTop = wrapperRef.current.offsetTop;

      const appearsOnScreen = elementOffsetTop - window.innerHeight;
      const leavesScreen = wrapperRef.current.offsetHeight + elementOffsetTop;

      /* its here, animate */
      if (scrollTop > appearsOnScreen && scrollTop < leavesScreen) {
        console.log(scrollTop, appearsOnScreen, leavesScreen);

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

  function mouseDown(e: React.MouseEvent) {
    if (!wrapperRef.current) return;

    setIsDragging(true);
    setStartDragClientX(e.pageX - wrapperRef.current.offsetLeft);
    setTranslateX(wrapperRef.current.scrollLeft);
  }

  function mouseUp() {
    setIsDragging(false);
  }

  function mouseMove(e: React.MouseEvent) {
    if (!wrapperRef.current || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = x - startDragClientX;
    wrapperRef.current.scrollLeft = translateX - walk;
  }

  return (
    <>
      <div className={styles['dummy-component']}>
        EXAMPLE PREVIOUS COMPONENT
      </div>
      <div
        className={styles.wrapper}
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
      <div className={styles['dummy-component']}>EXAMPLE NEXT COMPONENT</div>
    </>
  );
};

export default CarouselImages;
