'use client';

import React, { useEffect, useState, type JSX } from 'react';
import {
  AddressFinderProps,
  FindAddressData,
  FindAddressResponse,
  SpiltAddressResponse,
} from './AddressFinder.types';
import styles from './AddressFinder.module.scss';
import TextButton from '../TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import Text from '../../foundation/Text/Text';
import useSWR from 'swr';

const AddressFinder = (props: AddressFinderProps): JSX.Element => {
  const {
    defaultStep = 'automatic',
    render,
    error,
    findAddressEndpoint = '/',
    splitAddressEndpoint = '/',
  } = props;

  const [step, setStep] = useState<'manual' | 'automatic' | 'saved'>(
    defaultStep
  );

  useEffect(() => {
    if (defaultStep) {
      setStep(defaultStep);
    }
  }, [defaultStep]);

  const [input, setInput] = useState('');

  // Find addresses
  const {
    data: findAddressData,
    error: findAddressError,
    isLoading: findAddressIsLoading,
  } = useSWR<FindAddressResponse>(
    `${findAddressEndpoint}?postcode=${input}`,
    input
      ? (url: string) =>
          fetch(url, {
            method: 'POST',
          }).then((res) => res.json())
      : () => ({ category: 'postcode', data: [] }),
    {
      keepPreviousData: false,
      revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window - important for google maps embeds
    }
  );
  const findAddressNoResults = findAddressData?.data?.[0]?.id === 'noresult';

  const [foundAddress, setFoundAddress] = useState<FindAddressData>();

  const splitAddressFetcher = (url: string) => {
    if (!foundAddress?.id) {
      return new Promise((resolve) =>
        resolve({
          address1: '',
          address2: '',
          county: '',
          postcode: '',
          town: '',
        })
      );
    }
    return fetch(url, {
      method: 'POST',
    }).then((res) => res.json());
  };

  // Split address
  const {
    data: splitAddressData,
    // error: splitAddressError,
    // isLoading: splitAddressIsloading,
  } = useSWR<SpiltAddressResponse>(
    `${splitAddressEndpoint}?monikerField=${foundAddress?.id}`,
    splitAddressFetcher,
    {
      keepPreviousData: true, // Never show nothing
      revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window - important for google maps embeds
    }
  );

  return (
    <div className={styles['address-wrapper']}>
      {step !== 'manual' && (
        <label className={styles['field-label']}>Address</label>
      )}
      {step === 'automatic' && (
        <>
          <div className={styles['search-wrapper']}>
            <Icons iconName={'iconSearch'} />
            <input
              type="text"
              className={styles.search}
              placeholder="Start typing your address..."
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
            <span
              className={styles.cross}
              onClick={() => {
                setInput('');
              }}
            >
              <Icons iconName="iconCross" />
            </span>
          </div>
          {error && (
            <div className={styles['error-message']}>
              <Icons iconName="iconWarning" />
              <Text variation="body-medium-medium">{error}</Text>
            </div>
          )}

          <div className={styles.results}>
            {!findAddressIsLoading &&
              !findAddressNoResults &&
              !!findAddressData?.data?.length && (
                <ul>
                  {findAddressData?.data.map((result) => {
                    return (
                      <li key={result.id}>
                        <button
                          onClick={() => {
                            setFoundAddress(result);
                            setInput('');
                            setStep('manual');
                          }}
                          type="button"
                        >
                          <Icons iconName="iconPin"></Icons>
                          {result.address}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            {findAddressIsLoading && (
              <ul>
                <li>
                  <div className={styles.loader}>
                    <Loader theme="light" />
                    <Text tag="p" variation="body-small">
                      Loading...
                    </Text>
                  </div>
                </li>
              </ul>
            )}
            {(findAddressNoResults || findAddressError) && (
              <ul>
                <li>
                  <div className={styles.loader}>
                    <Text tag="p" variation="body-medium-small">
                      No results found
                    </Text>
                  </div>
                </li>
              </ul>
            )}
          </div>
          <div className={styles['manual-button']}>
            <TextButton theme="dark">
              <button
                onClick={() => {
                  setStep('manual');
                }}
                type="button"
              >
                Enter your address manually
              </button>
            </TextButton>
          </div>
        </>
      )}

      {step === 'saved' && (
        <>
          <div className={styles['selected-address']}>
            <Text variation="body-medium-extra-large">Your Address</Text>
            {splitAddressData && (
              <div className={styles['selected-fields']}>
                <div className="sr-only">{render(splitAddressData)}</div>
                {Object.entries(splitAddressData).map(
                  ([key, value]: [string, string]) => (
                    <>
                      <div key={key}>{value}</div>
                    </>
                  )
                )}
              </div>
            )}

            <div className={styles['selected-controls']}>
              <TextButton theme="dark">
                <button onClick={() => setStep('manual')} type="button">
                  Edit
                </button>
              </TextButton>
              <TextButton theme="dark">
                <button onClick={() => setStep('automatic')} type="button">
                  Remove
                </button>
              </TextButton>
            </div>
          </div>
        </>
      )}

      {step === 'manual' && (
        <div
          className={[
            styles['manual-fields'],
            step !== 'manual' && styles.hidden,
          ].join(' ')}
        >
          {render(foundAddress ? splitAddressData : undefined)}
          {
            <div className={styles['new-search']}>
              <TextButton theme="dark">
                <button
                  onClick={() => {
                    setStep('automatic');
                    setFoundAddress(undefined);
                  }}
                  type="button"
                >
                  New search
                </button>
              </TextButton>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default AddressFinder;
