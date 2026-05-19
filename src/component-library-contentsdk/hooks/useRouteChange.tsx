'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const useRouteChange = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    setIsRouteChanging(false);
    document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [pathname, searchParams]);

  return { isRouteChanging };
};

export default useRouteChange;
