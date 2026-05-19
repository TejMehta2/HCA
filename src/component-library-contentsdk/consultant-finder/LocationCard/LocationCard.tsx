'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useEffect, type JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import { LocationCardProps } from './LocationCard.types';
import styles from './LocationCard.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import axios from 'axios';

const LocationCard = (props: LocationCardProps): JSX.Element | null => {
  const { setSelectedLocations, selectedLocations } = useContext(
    ConsultantFinderContext
  );
  const [totalConsultants, setTotalConsultants] = useState(null);
  const arrayWithSelectedSlugs: string[] = selectedLocations;
  const [isSelected, setSelected] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSelected(arrayWithSelectedSlugs.includes(props.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocations]);

  useEffect(() => {
    const keywordIdQuery = searchParams.get('keywordId') || '';
    // get searchString from URL
    const searchStringQuery = searchParams.get('searchString') || '';
    // get payment option from URL
    const paymentOption = searchParams.get('insurer') || '';

    axios
      .get(
        `https://api.doctify.com/api/hca/search?search=${searchStringQuery}&keywordId=${keywordIdQuery}&sortType=${'relevance'}&insurer=${`${
          paymentOption !== 'selfPay' ? paymentOption : ''
        }`}&distance=${'0'}&lat=${'51.5072178'}&lon=${'-0.1275862'}&limit=${'12'}&practice=${
          props.slug
        }&offset=0`
      )
      .then((resp: any) => {
        setTotalConsultants(resp.data.total);
      })
      .catch((error: any) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [searchParams]);

  const handleClick = () => {
    const newArray: string[] = selectedLocations;
    // Check if the slug already exists in the array
    const slugIndex = newArray.indexOf(props.slug);
    if (slugIndex !== -1) {
      // If it exists, remove it from the array
      newArray.splice(slugIndex, 1);
    } else {
      // If it doesn't exist, add it to the array
      newArray.push(props.slug);
    }

    const isSelectedSlug = newArray.includes(props.slug);
    // const newArray = [props.slug];
    setSelected(isSelectedSlug);
    // console.log('newArray', newArray);
    props.setArray(props.slug);
    setSelectedLocations(newArray);
  };

  // If totalConsultants is 0, return null to prevent card from being displayed
  if (totalConsultants === 0) {
    return null;
  }

  return (
    <div
      className={
        !isSelected
          ? styles['location-card']
          : `${styles['location-card']} ${styles['location-card-selected']}`
      }
      data-parent="parent"
    >
      <div className={styles.content}>
        {props.distance && (
          <div className={styles.distance}>
            <Icons iconName="iconPin" />
            <Text tag="p" variation="body-medium-small">
              {props.distance} miles
            </Text>
          </div>
        )}
        <div>
          <Text tag="p" variation="body-medium-large">
            {props.name}
          </Text>
        </div>
        <div className={styles.address}>
          <Text tag="p" variation="body-medium-small">
            {props.addressLine1} {props.city}
          </Text>
          <Text tag="p" variation="body-medium-small">
            {props.postcode}
          </Text>
        </div>
        <div className={styles.consultants}>
          <div className={styles.number}>
            <Text tag="p" variation="body-medium-small">
              {totalConsultants}
            </Text>
          </div>
          <Text tag="p" variation="body-medium-small">
            consultants
          </Text>
        </div>
      </div>
      <div className={styles.select}>
        <button
          className={
            !isSelected
              ? styles['btn']
              : `${styles['btn']} ${styles['btn-selected']}`
          }
          onClick={handleClick}
        >
          {!isSelected ? (
            <Icons iconName="iconPlus" />
          ) : (
            <Icons iconName="iconCross" />
          )}
          <Text tag="span" variation="body-medium-large">
            {!isSelected ? props.selectCardText : props.removeCardText}
          </Text>
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
