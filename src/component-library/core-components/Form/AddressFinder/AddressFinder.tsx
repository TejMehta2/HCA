import React, { useState, ChangeEvent, useRef } from 'react';
import { AddressFinderProps } from './AddressFinder.types';
import styles from './AddressFinder.module.scss';
import TextButton from '../../TextButton/TextButton';
import Icons from '../../../foundation/Icons/Icons';
import Loader from '../../../foundation/Loader/Loader';
import Text from '../../../foundation/Text/Text';
import TextField from '../../TextField/TextField';

const AddressFinder = (props: AddressFinderProps): JSX.Element => {
  const { helpText } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const mockTestAddress = {
    line1: '123 Test Street',
    city: 'London',
    country: 'United Kingdom',
    postcode: 'SE1 1AB',
  };

  const mockResults = [
    {
      line1: '1 Test Street',
      line2: 'Somewhere',
      city: 'London',
      country: 'UK',
      postcode: 'SE1 1AB',
      id: '1',
    },
    {
      line1: '2 Test Street',
      line2: 'Somewhere',
      city: 'London',
      country: 'UK',
      postcode: 'SE1 1AB',
      id: '2',
    },
    {
      line1: '3 Test Street',
      line2: '',
      city: 'London',
      country: 'UK',
      postcode: 'SE1 1AB',
      id: '3',
    },
  ];

  const [manualFieldsVisible, setManualFieldsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(mockTestAddress);
  const [showSelectedAddress, setShowSelectedAddress] = useState(false);

  const showManualFields = () => {
    setManualFieldsVisible(true);
  };

  const clearAddress = () => {
    setSelectedAddress({
      line1: '',
      line2: '',
      city: '',
      country: '',
      postCode: '',
    });
    setShowSelectedAddress(false);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResults(mockResults);

    setSearchTerm(e.target.value);
  };

  const selectResult = (result) => {
    const { line1, line2, city, country, postcode } = result;
    setSelectedAddress({
      line1: line1,
      line2: line2,
      city: city,
      country: country,
      postcode: postcode,
    });

    setShowSelectedAddress(true);
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
          <button onClick={showManualFields} type="button">
            Enter your address manually
          </button>
        </TextButton>
      </div>
      {helpText && <div>{helpText}</div>}
      {results && results.length && (
        <div className={styles.results}>
          <ul>
            {results.map((result) => {
              const { line1, line2, city, country, postcode } = result;
              return (
                <li key={result.id}>
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

      {showSelectedAddress && (
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
