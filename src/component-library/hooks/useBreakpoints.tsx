import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Breakpoint = 'screen-s' | 'screen-m' | 'screen-l' | 'screen-xl';

const defaultBreakpoints = new Map<Breakpoint, number>([
  ['screen-s', 0],
  ['screen-m', 600],
  ['screen-l', 1135],
  ['screen-xl', 1440],
]);

const useBreakpoints = (breakpoints = defaultBreakpoints) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('screen-s');
  const entries = Array.from(breakpoints.entries()).toReversed();

  const handleResize = useDebouncedCallback(() => {
    const newBreakpoint = entries?.find(([, value]) => {
      return window.innerWidth > value;
    })?.[0];
    if (newBreakpoint && newBreakpoint !== breakpoint) {
      setBreakpoint(newBreakpoint);
    }
    window.addEventListener('resize', handleResize);
  }, 100);

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return breakpoint;
};

export default useBreakpoints;
