import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { AddressFinderProps, addressResult } from './AddressFinder.types';
import styles from './AddressFinder.module.scss';
import TextButton from '../TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import Text from '../../foundation/Text/Text';
import { useDebouncedCallback } from 'use-debounce';

const AddressFinder = (props: AddressFinderProps): JSX.Element => {
  const {
    searchAddress,
    chosenAddress,
    addressResults,
    isLoading,
    displayErrors,
    helpText,
  } = props;

  const [manualFieldsVisible, setManualFieldsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<addressResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAutoSearch, setShowAutoSearch] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    postcode: '',
    country: '',
  });
  const [showSelectedAddress, setShowSelectedAddress] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading);
    }

    chosenAddress(selectedAddress);
  }, [isLoading, selectedAddress, chosenAddress]);

  useEffect(() => {
    if (addressResults) {
      setResults(addressResults);
      setShowResults(true);
    }
  }, [addressResults]);

  useEffect(() => {
    if (displayErrors) {
      setManualFieldsVisible(true);
      setShowAutoSearch(false);
    }
  }, [displayErrors]);

  const inputRef = useRef<HTMLInputElement>(null);
  const clearInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    setResults([]);
  };

  const showManualFields = () => {
    setManualFieldsVisible(true);
    setShowSelectedAddress(false);
    setShowAutoSearch(false);
  };

  const clearAddress = () => {
    setSelectedAddress({
      line1: '',
      line2: '',
      city: '',
      country: '',
      postcode: '',
    });
    setShowSelectedAddress(false);
    setShowAutoSearch(true);
    setManualFieldsVisible(false);
  };

  const handleTextChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      searchAddress(e.target.value);
      setResults(results);
    },
    1000
  );

  const selectResult = (result: addressResult) => {
    const { line1, line2, city, country, postcode } = result;
    const address = {
      line1: line1,
      line2: line2,
      city: city,
      country: country,
      postcode: postcode,
    };
    setSelectedAddress(address);
    setShowSelectedAddress(true);
    setResults([]);
    setShowResults(false);
    setShowAutoSearch(false);
    if (!inputRef.current) return;
    inputRef.current.value = `${line1}, ${line2}, ${city}, ${country}, ${postcode}`;
  };

  return (
    <div className={styles.wrapper}>
      {showAutoSearch && (
        <>
          <div className={styles['search-wrapper']}>
            <Icons iconName={'iconSearch'} />
            <input
              type="text"
              className={styles.search}
              placeholder="Start typing your address..."
              onChange={handleTextChange}
              ref={inputRef}
            />
            <span className={styles.cross} onClick={clearInput}>
              <Icons iconName="iconCross" />
            </span>
          </div>

          <div className={styles['manual-button']}>
            <TextButton theme="dark">
              <button onClick={showManualFields} type="button">
                Enter your address manually
              </button>
            </TextButton>
          </div>
          {helpText && <div>{helpText}</div>}
        </>
      )}

      {!!results?.length && showResults && (
        <div className={styles.results}>
          <ul>
            {results.map((result, index) => {
              const { line1, line2, city, country, postcode } = result;
              return (
                <li key={index}>
                  <button onClick={() => selectResult(result)}>
                    <Icons iconName="iconPin"></Icons>
                    {line1}, {line2 && `${line2},`} {city}, {country},{' '}
                    {postcode}
                  </button>
                </li>
              );
            })}
          </ul>

          {loading && (
            <div className={styles.loader}>
              <Loader theme="light" />
              <Text tag="p" variation="body-small">
                Loading...
              </Text>
            </div>
          )}
        </div>
      )}

      {showSelectedAddress && selectedAddress && (
        <div className={styles['selected-address']}>
          <Text variation="body-medium-extra-large">Your Address</Text>

          <div className={styles['selected-fields']}>
            <div>{selectedAddress.line1}</div>
            {selectedAddress.line2 && <div>{selectedAddress.line2}</div>}
            <div>
              {selectedAddress.city}, {selectedAddress.country}
            </div>
            <div>{selectedAddress.postcode}</div>
          </div>

          <div className={styles['selected-controls']}>
            <TextButton theme="dark">
              <button onClick={showManualFields}>Edit</button>
            </TextButton>
            <TextButton theme="dark">
              <button onClick={clearAddress}>Remove</button>
            </TextButton>
          </div>
        </div>
      )}

      {manualFieldsVisible && (
        <div className={styles['manual-fields']}>
          <div className={styles['manual-field-wrapper']}>
            <label htmlFor="address-1">Address Line 1</label>
            <input
              id="address-1"
              required={true}
              onChange={(e) =>
                setSelectedAddress({
                  ...selectedAddress,
                  line1: e.target.value,
                })
              }
              value={selectedAddress.line1}
              pattern="^[a-zA-Z0-9- ']{1,60}$"
            />
            <div className={styles['error-message']}>
              <Icons iconName="iconWarning" />
              <Text variation="body-medium-medium">
                Please enter the first line of your address
              </Text>
            </div>
          </div>

          <div className={styles['manual-field-wrapper']}>
            <label htmlFor="line2">Address Line 2</label>
            <input
              id="line2"
              onChange={(e) =>
                setSelectedAddress({
                  ...selectedAddress,
                  line2: e.target.value,
                })
              }
              value={selectedAddress.line2}
              pattern="^[a-zA-Z0-9- ']{1,60}$"
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              required={true}
              onChange={(e) =>
                setSelectedAddress({ ...selectedAddress, city: e.target.value })
              }
              value={selectedAddress.city}
              pattern="^[a-zA-Z0-9- ']{1,60}$"
            />
            <div className={styles['error-message']}>
              <Icons iconName="iconWarning" />
              <Text variation="body-medium-medium">
                Please enter town or city name
              </Text>
            </div>
          </div>

          <div className={styles['manual-field-wrapper']}>
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              required={true}
              onChange={(e) =>
                setSelectedAddress({
                  ...selectedAddress,
                  postcode: e.target.value,
                })
              }
              value={selectedAddress.postcode}
              pattern="^[a-zA-Z0-9- ']{1,60}$"
            />
            <div className={styles['error-message']}>
              <Icons iconName="iconWarning" />
              <Text variation="body-medium-medium">
                Please enter a valid postcode
              </Text>
            </div>
          </div>

          <div className={styles['manual-field-wrapper']}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              required={true}
              onChange={(e) =>
                setSelectedAddress({
                  ...selectedAddress,
                  country: e.target.value,
                })
              }
              value={selectedAddress.country}
            />
            <div className={styles['error-message']}>
              <Icons iconName="iconWarning" />
              <Text variation="body-medium-medium">Please enter a country</Text>
            </div>
          </div>

          <div className={styles['new-search']}>
            <TextButton theme="dark">
              <button onClick={clearAddress} type="button">
                New search
              </button>
            </TextButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressFinder;
