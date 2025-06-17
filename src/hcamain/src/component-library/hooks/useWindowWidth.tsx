import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useWindowWidth = (size: number) => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  const handleResize = useDebouncedCallback(() => {
    setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
  }, 100);

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return width >= size;
};

export default useWindowWidth;
