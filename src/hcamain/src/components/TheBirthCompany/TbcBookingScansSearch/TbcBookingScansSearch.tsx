import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import { TbcBookingScansSearchProps } from './TbcBookingScansSearch.types';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Button from '@component-library/core-components/Button/Button';

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
    </Themes>
  );
};
