import { useEffect } from 'react';
import handleClickEvents from './helpers/handleClickEvents';

// Custom tracking hook
// State used to only initialise once

// Valid tracking attributes:
// data-event, data-navigation-type

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const useCustomTracking = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.addEventListener('click', handleClickEvents);
    return () => {
      document.removeEventListener('click', handleClickEvents);
    };
  }, []);
};

export default useCustomTracking;
