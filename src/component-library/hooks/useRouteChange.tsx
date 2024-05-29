/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useRouteChange = () => {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: any, { shallow }: any) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      );
      setIsRouteChanging(true);
      document.body.style.overflow = 'hidden';
    };

    const handleRouteChangeComplete = (url: any, { shallow }: any) => {
      console.log(
        `App has changed to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      );
      setIsRouteChanging(false);
      document.body.style.overflow = '';
    };

    const handleRouteChangeError = (err: any, url: any) => {
      console.error(`Route change to ${url} failed`, err);
      setIsRouteChanging(false);
      document.body.style.overflow = '';
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Cleanup event listeners on unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return { isRouteChanging };
};

export default useRouteChange;
