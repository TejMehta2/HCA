import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import { TbcBookingScansSearchProps } from './TbcBookingScansSearch.types';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Button from '@component-library/core-components/Button/Button';

// Function to help process total price when x% of surcharge needs to be added
// const applyPercentage = (value: string, baseValue: number): number => {
//   if (value.endsWith('%')) {
//     const percentage = parseFloat(value) / 100;
//     return Math.round(baseValue * percentage);
//   }
//   return parseFloat(value);
// };

const formatPrice = (value: string): string => {
  return value.endsWith('%')
    ? `${value} scan price surcharge`
    : `£${Math.round(parseFloat(value))}`;
};

const TbcBookingScansSearchDefaultComponent = (
  props: TbcBookingScansSearchProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Tbc Booking Scans Search. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TbcBookingScansSearchProps): JSX.Element => {
  if (!props?.fields?.data?.item) {
    return <TbcBookingScansSearchDefaultComponent {...props} />;
  }

  console.log('props.fields.data.item', props.fields.data.item);

  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <SearchBar
        preventSubmitOnSuggestion={true}
        name="input"
        placeholder={props.fields?.data?.item?.searchPhrasePlaceholder?.value}
      />
      <p>{props.fields?.data?.item?.extrasLabel?.value}</p>
      <Button size={'large'} variation={'full'}>
        <button type="submit">
          {props.fields.data.item.startBookingCTA?.jsonValue?.value.text}
        </button>
      </Button>
      <div className="services">
        {props.fields?.data?.item?.servicesFolder.targetItem.children.results.map(
          (service) => (
            <div key={service.id} className="service">
              <strong>{service.serviceName.value}</strong>
              {service.extras.targetItems.length > 0 ? (
                <ul className="extras">
                  {service.extras.targetItems.map((extra) => (
                    <li key={extra.id}>
                      {extra.serviceExtraName.value}
                      <br /> - Price:{formatPrice(extra.price.value)}
                      <br /> - Duration: {extra.duration.value} mins
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No extras available</p>
              )}
            </div>
          )
        )}
      </div>
    </Themes>
  );
};
