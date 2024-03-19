import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import useSWR from 'swr';

interface useSearchFormArgs<T> {
  baseUrl: string;
  baselineParams?: [string, string][];
  fallbackData?: T;
  autocompleteBaseUrl?: string;
}
const useSearchForm = <ResponseT, AutocompleteResponseT>(
  args: useSearchFormArgs<ResponseT>
) => {
  const { baseUrl, baselineParams = [], fallbackData } = args;
  const searchParams = useSearchParams(); // dynamic reference to page URL query params
  const router = useRouter();
  const pathname = usePathname();
  const combinedParams = [...baselineParams, ...(searchParams.entries() || [])]; // Collect defaults and dynamic params from query
  const paramsMap = new Map(combinedParams); // Express as Map to make keys unique
  const params = [...paramsMap.entries()].map(
    (entry) => `${entry[0]}=${entry[1]}`
  ); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, `${baseUrl}/search`); // compose API url
  const { data, error, isLoading } = useSWR<ResponseT>(
    url.href,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      fallbackData,
      keepPreviousData: true,
    }
  );

  const input = searchParams.get('input');
  const autocompleteUrl = new URL(`?${input}`, `${baseUrl}/autocomplete`);
  const {
    data: autocompleteData,
    error: autocompleteError,
    isLoading: autocompleteIsLoading,
  } = useSWR<AutocompleteResponseT>(
    autocompleteUrl.href,
    (url: string) => fetch(url).then((res) => res.json()),
    {}
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
      if (isLoading) return;
      handleChangeEvent(event);
    },
    onReset: (event: FormEvent<HTMLFormElement>) => {
      console.log(event);
    },
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // prevent page refresh if user submits via "enter" key
      handleChangeEvent(event);
    },
  };

  return {
    data,
    error,
    formHandlers,
    searchParams,
    autocompleteData,
    autocompleteError,
    autocompleteIsLoading,
  };
};

export default useSearchForm;
