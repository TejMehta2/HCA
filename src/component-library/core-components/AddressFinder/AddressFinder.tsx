import React, { useState } from 'react';
import { AddressFinderProps } from './AddressFinder.types';
import styles from './AddressFinder.module.scss';
import TextButton from '../TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';

const AddressFinder = (props: AddressFinderProps): JSX.Element => {
  const { helpText } = props;

  const results = [
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
    {
      address: '4/10 Elliot Street, EDINBURGH',
      postcode: 'EH7 5LU',
      id: '7.730iOGBRCAznBwAAAAABAwEAAAAA9Az60YAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: '7/10 Elliot Street, EDINBURGH',
      postcode: 'EH7 5LX',
      id: '7.730aOGBRCAznBwAAAAABAwEAAAAA9A0kEYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: '5/10 Elliot Street, EDINBURGH',
      postcode: 'EH7 5LX',
      id: '7.730fOGBRCAznBwAAAAABAwEAAAAA9A0ekYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: '9/10 Elliot Street, EDINBURGH',
      postcode: 'EH7 5LX',
      id: '7.730UOGBRCAznBwAAAAABAwEAAAAA9A0pkYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: '10 Elliot Street, PLYMOUTH',
      postcode: 'PL1 2PP',
      id: '7.7301OGBRCAznBwAAAAABAwEAAAAAXgtnkYAhAAIAAAAAAAAAAAD..2QAAAAA.....wAAAAAAAAAAAAAAAAAAADEwIGVsbGlvdCBzdHJlZXQAAAAAAA--',
    },
    {
      address: '10 Elliot Street, ARBROATH, Angus',
      postcode: 'DD11 3BY',
      id: '7.730WOGBRCAznBwAAAAABAwEAAAB3md0YAhAAIAAAAAAAAAAA..9kAAAAAP....8AAAAAAAAAAAAAAAAAAAAxMCBlbGxpb3Qgc3RyZWV0AAAAAAA-',
    },
    {
      address: '10 Elliot Street, Elliots Town, NEW TREDEGAR, Gwent',
      postcode: 'NP24 6DP',
      id: '7.730POGBRCAznBwAAAAABAwEAAAAAixZsEYAgAAAAAAAAMTAAAP..ZAAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: 'Flat 10, Minerva Court, 20 Elliot Street, GLASGOW',
      postcode: 'G3 8EB',
      id: '7.730TOGBRCAznBwAAAAABAwEAAAAAubB80YAhAAIQAGAAAAAAAAAxMAAA..9aAAAAAP....8AAAAAAAAAAAAAAAAAAAAxMCBlbGxpb3Qgc3RyZWV0AAAAAAA-',
    },
    {
      address: 'Flat 10, Citadel Court, 2 Elliot Street, PLYMOUTH',
      postcode: 'PL1 2PP',
      id: '7.730GOGBRCAznBwAAAAABAwEAAAAAXgtFEYAhAAIQAGAAAAAAAAAxMAAA..9aAAAAAP....8AAAAAAAAAAAAAAAAAAAAxMCBlbGxpb3Qgc3RyZWV0AAAAAAA-',
    },
    {
      address: 'Flat 10, 4 Elliot Street, PLYMOUTH',
      postcode: 'PL1 2PP',
      id: '7.730QOGBRCAznBwAAAAABAwEAAAAAXgtY0YAhAAIAAAAAAAAAMTAAAP..WgAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: 'Flat 10, 17 Elliot Street, PLYMOUTH',
      postcode: 'PL1 2RL',
      id: '7.730.OGBRCAznBwAAAAABAwEAAAAAXgtw0YAhAAIAAAAAAAAAMTAAAP..WgAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: 'Flat 10, 22 Elliot Street, PLYMOUTH',
      postcode: 'PL1 2BA',
      id: '7.730AOGBRCAznBwAAAAABAwEAAAAAXgs_UYAhAAIAAAAAAAAAMTAAAP..WgAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
    {
      address: 'Flat 10, 24 Elliot Street, PLYMOUTH',
      postcode: 'PL1 2BE',
      id: '7.730GOGBRCAznBwAAAAABAwEAAAAAXgt8EYAhAAIAAAAAAAAAMTAAAP..WgAAAAD.....AAAAAAAAAAAAAAAAAAAAMTAgZWxsaW90IHN0cmVldAAAAAAA',
    },
  ];

  const [manualFieldsVisible, setManualFieldsVisible] = useState(false);

  const handleManualFields = () => {
    setManualFieldsVisible(true);
  };

  return (
    <>
      <div className={styles['search-wrapper']}>
        <input
          type="text"
          className={styles.search}
          placeholder="Start typing your address..."
        />
      </div>
      <TextButton theme="dark">
        <button onClick={handleManualFields}>
          Enter your address manually
        </button>
      </TextButton>
      {helpText && <div>{helpText}</div>}
      <div className={styles.results}>
        <ul>
          {results &&
            results.map((result) => {
              return (
                <li key={result.id}>
                  <Icons iconName="iconPin"></Icons>
                  {result.address}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default AddressFinder;
