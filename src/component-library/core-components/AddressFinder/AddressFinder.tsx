import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { AddressFinderProps } from './AddressFinder.types';
import styles from './AddressFinder.module.scss';
import TextButton from '../TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';
import TextField from '../TextField/TextField';
import Loader from '../../foundation/Loader/Loader';
import Text from '../../foundation/Text/Text';

const AddressFinder = (props: AddressFinderProps): JSX.Element => {
  const { helpText } = props;

  const mockTestAddress = {
    line1: '123 Test Street',
    city: 'London',
    country: 'United Kingdom',
    postcode: 'SE1 1AB',
  };

  const [manualFieldsVisible, setManualFieldsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [resultsVisible, setResultsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(mockTestAddress);

  const inputRef = useRef<HTMLInputElement>(null);

  const mockResults = [
    {
      address: '10 Elliot Street, Sacriston, DURHAM',
      postcode: 'DH7 6JH',
      id: '7.730OOGBRCAznBwAAAAABAwEAAAAARog6UYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: '2/10 Elliot Street, EDINBURGH',
      postcode: 'EH7 5LU',
      id: '7.7304OGBRCAznBwAAAAABAwEAAAAA9Az1kYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: '8/10 Elliot Street, EDINBURGH',
      postcode: 'EH7 5LU',
      id: '7.730GOGBRCAznBwAAAAABAwEAAAAA9A0DkYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
  ];

  const handleManualFields = () => {
    setManualFieldsVisible(true);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResults(mockResults);

    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['search-wrapper']}>
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
          <button onClick={handleManualFields} type="button">
            Enter your address manually
          </button>
        </TextButton>
      </div>
      {helpText && <div>{helpText}</div>}
      {results && results.length && (
        <div className={styles.results}>
          <ul>
            {results.map((result) => {
              return (
                <li key={result.id}>
                  <Icons iconName="iconPin"></Icons>
                  {result.address}
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

      {selectedAddress && (
        <div className={styles['selected-address']}>
          <Text variation="body-medium-extra-large">Your Address</Text>
          <div>{selectedAddress.line1}</div>
          {selectedAddress.line2 && <div>{selectedAddress.line2}</div>}
          <div>
            {selectedAddress.city}, {selectedAddress.country}
          </div>
          <div>{selectedAddress.postcode}</div>

          <div className={styles.selectedControls}>
            <TextButton theme="dark">
              <button>Edit</button>
            </TextButton>
            <TextButton theme="dark">
              <button>Remove</button>
            </TextButton>
          </div>
        </div>
      )}

      {manualFieldsVisible && (
        <div className={styles['manual-fields']}>
          <TextField
            id="address-1"
            label="Address Line 1"
            required={true}
            errorMessage="Please fill in the first line of your address"
          />
          <TextField id="address-2" label="Address Line 2" />
          <TextField
            id="city"
            label="City"
            required={true}
            errorMessage="Please fill in the city"
          />
          <TextField
            id="postcode"
            label="Postcode"
            required={true}
            errorMessage="Please fill in the postcode"
          />
          <TextField
            id="country"
            label="Country"
            required={true}
            errorMessage="Please fill in the country"
          />
        </div>
      )}
    </div>
  );
};

export default AddressFinder;
