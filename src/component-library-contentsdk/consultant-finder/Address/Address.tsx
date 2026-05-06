import React, { type JSX } from 'react';
import { AddressProps } from './Address.types';
import Text from '../../foundation/Text/Text';
import styles from './Address.module.scss';
import { capitalizeFirstLetter } from '../../utility-functions';
import Icons from '../../foundation/Icons/Icons';

const Address = (props: AddressProps): JSX.Element => {
  const addressItems = [];
  const address: string[] = [];
  addressItems.push(props.street1, props.street2, props.city, props.postcode);

  addressItems.forEach((item) => {
    if (item !== null && item !== '' && item?.length > 0) {
      address.push(capitalizeFirstLetter(item));
    }
  });

  const printAddress = address.toString().split(',').join(', ');

  return (
    <div className={styles.address}>
      <Icons iconName="iconPin" />
      <Text tag="h3" variation="body-medium-large">
        {printAddress}
      </Text>
    </div>
  );
};

export default Address;
