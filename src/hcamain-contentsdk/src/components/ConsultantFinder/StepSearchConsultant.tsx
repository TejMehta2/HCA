/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX } from 'react';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import SearchConsultant from '@component-library/consultant-finder/Search/SearchConsultant';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC

  // add specific fields defined in the data template here...

  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
  TitleText: Field<string>;
  CardImage: ImageField;
  HeadingText: Field<string>;
  BodyText: Field<string>;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  PopularConsultantsList: any;
  SearchIconSearchBar: any;
  SearchIconResults: any;
  SearchPlaceholderText: Field<string>;
  SearchConsultantsResultsHeaderText: Field<string>;
  API_Autocomplete_LoadingMsg: Field<string>;
  API_Autocomplete_BaseURL: Field<string>;
  API_Autocomplete_NoResultsMsg: Field<string>;
  API_Autocomplete_Limit: Field<string>;
  API_DoctifySearch_BaseURL: Field<string>;
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const router = useRouter();
  const {
    searchStringConsultantName,
    setSearchStringConsultantName,
    consultantSlug,
  } = useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  // console.log('search consultant by name', props);
  console.log('props?.fields?.PopularConsultantsList ', props?.fields?.PopularConsultantsList);
  console.log(props.fields.NextLink);

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        <ImageAndTextBlock
          contentVariation={'hero-cf'}
          noOverflownHidden={true}
          theme="A-HCA-White"
          imageAlignment="left"
          length="short"
          cfVariation={true}
          subheader={
            <Text tag="h3" variation="subheading-1">
              <JssRichText field={props.fields.HeadingText} />
            </Text>
          }
          header={
            <Text tag="h2" variation="display-2">
              <JssRichText field={props.fields.TitleText} />
            </Text>
          }
          image={<JssImage field={props.fields.CardImage} />}
        >
          <Text tag="div" variation="body-large">
            <JssRichText field={props.fields.BodyText} />
          </Text>
          <form autoComplete="off">
            <SearchConsultant
              placeholder={
                props?.fields?.SearchPlaceholderText?.value ||
                'Type in a consultant name'
              }
              doctifyBaseURL={
                props?.fields?.API_Autocomplete_BaseURL?.value ||
                'https://api.doctify.com/api/hca/search/autocomplete?search'
              }
              doctifySearchBaseURL={
                props?.fields?.API_DoctifySearch_BaseURL?.value ||
                'https://api.doctify.com/api/hca/search'
              }
              limit={Number(props?.fields?.API_Autocomplete_Limit?.value) || 20}
              noResultsMsg={
                props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
                'No matches found, please try typing something else.'
              }
              searchIcon={
                props?.fields?.SearchIconSearchBar?.fields?.SvgMarkup?.value ||
                null
              }
              searchIconResults={
                props?.fields?.SearchIconResults?.fields?.SvgMarkup?.value ||
                null
              }
              searchStringConsultantName={searchStringConsultantName}
              setSearchStringConsultantName={setSearchStringConsultantName}
              popularConsultantsList={
                props?.fields?.PopularConsultantsList || []
              }
              searchConsultantsResultsHeaderText={
                props?.fields?.SearchConsultantsResultsHeaderText?.value ||
                'SPECIALISTS'
              }
              loadingText={
                props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                'Loading...'
              }
            />
          </form>
        </ImageAndTextBlock>
        <Navigation>
          <TextButton>
            <JssLink field={props.fields.BackLink}>
              <Icons iconName="iconArrowSmallLeft" />
              {props.fields.BackLink.value.text}
            </JssLink>
          </TextButton>

          <Button size={'small'} variation={'full-dark'}>
            <button
              disabled={consultantSlug === '' ? true : false}
              onClick={() =>
                router.push(
                  `${props?.fields?.NextLink?.value?.href &&
                  props?.fields?.NextLink?.value?.href.replace(/,-w-,/g, '')
                  }${consultantSlug}` || ''
                )
              }
            >
              <span>{props.fields.NextLink.value.text || 'Next'}</span>
            </button>
          </Button>
        </Navigation>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
