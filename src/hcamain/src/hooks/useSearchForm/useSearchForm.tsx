import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import useSWR from 'swr';

interface useSearchFormArgs {
  baseUrl: string;
}
const useSearchForm = <T,>({ baseUrl }: useSearchFormArgs) => {
  const searchParams = useSearchParams(); // dynamic reference to page URL query params
  const router = useRouter();
  const pathname = usePathname();
  const url = new URL(`?${searchParams.toString()}`, baseUrl); // compose API url

  const { data, error, isLoading } = useSWR<T>(
    url.href,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
      dedupingInterval: 3600000, // only revalidate duplicate search once per hour
    }
  );

  // Update existing query params, to be read by useSwr hook
  const handleChangeEvent = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams([...data.entries()] as string[][]);
    const url = `${pathname}?${params}`;
    router.replace(url, undefined, { shallow: true });
  };

  // Handlers to spread into a form element e.g. <form {...formhandlers} />
  const formHandlers = {
    onChange: (event: FormEvent<HTMLFormElement>) => {
      const target = event.target as HTMLInputElement;
      if (isLoading || ['search', 'text'].includes(target.type)) return;
      handleChangeEvent(event);
    },
    onBlur: (event: FormEvent<HTMLFormElement>) => {
      const target = event.target as HTMLInputElement;
      if (isLoading || !['search', 'text'].includes(target.type)) return;
      handleChangeEvent(event);
    },
    onReset: (event: FormEvent<HTMLFormElement>) => {
      console.log(event);
      // TODO - manual partial reset
    },
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // prevent page refresh if user submits via "enter" key
      handleChangeEvent(event);
    },
  };

  return { data, error, formHandlers, searchParams };
};

export default useSearchForm;
