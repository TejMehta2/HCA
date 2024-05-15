import { useEffect, useState } from 'react';
import handleClickEvents from './helpers/handleClickEvents';

// Custom tracking hook
// State used to only initialise once

// Valid tracking attributes:
// data-event, data-navigation-type

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const useCustomTracking = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || active) return;
    setActive(true);
    document.addEventListener('click', handleClickEvents);
    return () => {
      document.removeEventListener('click', handleClickEvents);
    };
  }, [active]);
};

export default useCustomTracking;
