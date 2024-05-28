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
    };

    const handleRouteChangeComplete = (url: any, { shallow }: any) => {
      console.log(
        `App has changed to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      );
      setIsRouteChanging(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // Cleanup event listeners on unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return { isRouteChanging };
};

export default useRouteChange;
