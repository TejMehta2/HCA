/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import {
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import SearchPayment from '@component-library/consultant-finder/Search/SearchPayment';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Container from '@component-library/foundation/Containers/Container';
import Headline from '@component-library/consultant-finder/Headline/Headline';
import { isMobile } from '@component-library/utility-functions/index';
import { getQueryValue } from './routeQuery';

interface Fields {
  TitleText: Field<string>;
  HeadingText: Field<string>;
  CardImage: ImageField;
  BodyText: Field<string>;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  SearchIcon: any;
  InsuranceProvidersFilterHeaderText: Field<string>;
  InsurersList: any;
  API_Insurance_BaseURL: Field<string>;
  API_Insurance_NoResultsMsg: Field<string>;
  API_Insurance_Limit: Field<string>;
  API_Insurance_LoadingMsg: Field<string>;
  SearchPlaceholderText: Field<string>;
  SelfPayCheckBoxText: Field<string>;
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
  const searchParams = useSearchParams();
  const {
    searchStringPayment,
    setSearchStringPayment,
    setIsSelfPayment,
    isSelfPayment,
    selectedInsurerPaymentStep,
    searchStringLocations,
    lat,
    lon,
    distance
  } = useContext(ConsultantFinderContext);
  const [search, setSearch] = useState('');
  const [keywordId, setKewordId] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // get keywordID from URL
    setKewordId(getQueryValue(searchParams, 'keywordId'));

    // get searchString from URL
    setSearch(getQueryValue(searchParams, 'searchString'));

    setIsSelfPayment(false);
    setSearchStringPayment('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (props.fields) {
    return (
      <>
        {(
          <>
            <Headline
              withConsultantName={true}
              backLinkProfile={props?.fields?.BackLink?.value?.href}
              backLinkText={props?.fields?.BackLink?.value?.text || 'Back'}
              hasTitleName={false}
            >
            </Headline>
            <ImageAndTextBlock
              noOverflownHidden={true}
              contentVariation={'hero-cf'}
              cfVariation={true}
              showRegion={false}
              theme="A-HCA-White"
              imageAlignment="left"
              length="short"
              hideImageOnMobile={true}
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
              image={null}
            >
              <Text tag="div" variation="body-large">
                <JssRichText field={props.fields.BodyText} />
              </Text>
              <form autoComplete="off">
                <Container marginTop="spacing-4" marginBottom="spacing-4">
                  <Text tag="h2" variation="heading-2">
                    {props.fields.TitleText.value}
                  </Text>
                </Container>

                <Checkbox
                  id="1"
                  label={props.fields.SelfPayCheckBoxText.value}
                  name="selfpayment"
                  value="selfpayment"
                  checked={isSelfPayment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      setIsSelfPayment(e.target.checked);
                      setSearchStringPayment('');
                      if (!isMobile()) {
                        if (searchStringLocations !== 'London' && searchStringLocations !== 'Anywhere') {
                          router.push(
                            `/finder/step-consultant-cards?search=${search}&keywordId=${keywordId}&sortType=relevance&lat=${lat || '51.507217'}&lon=${lon || '-0.1275862'}&distance=${distance || 0}&limit=12&offset=0`
                          )
                        }
                        else {
                          router.push(
                            `${props.fields.NextLink.value.href ||
                            '/finder/step-locations'
                            }?keywordId=${keywordId}&searchString=${search}`
                          )
                        }
                      }
                    }

                  }}
                ></Checkbox>
                <SearchPayment
                  placeholder={
                    props?.fields?.SearchPlaceholderText?.value ||
                    'Type in your insurance provider'
                  }
                  doctifyBaseURL={
                    props?.fields?.API_Insurance_BaseURL?.value ||
                    'https://api.doctify.com/api/hca/listing/insurers'
                  }
                  limit={
                    Number(props?.fields?.API_Insurance_Limit?.value) || 20
                  }
                  noResultsMsg={
                    props?.fields?.API_Insurance_NoResultsMsg?.value ||
                    'No matches found, please try typing something else.'
                  }
                  searchIcon={
                    props?.fields?.SearchIcon?.fields?.SvgMarkup?.value || null
                  }
                  searchStringPayment={searchStringPayment}
                  setSearchStringPayment={setSearchStringPayment}
                  insuranceProvidersFilterHeaderText={
                    props?.fields?.InsuranceProvidersFilterHeaderText?.value ||
                    'INSURERS'
                  }
                  insurersList={props?.fields?.InsurersList || []}
                  loadingText={
                    props?.fields?.API_Insurance_LoadingMsg?.value ||
                    'Loading...'
                  }
                  nextLink={`${props.fields.NextLink.value.href ||
                    '/finder/step-locations'
                    }?keywordId=${keywordId}&searchString=${search}`}
                  search={search}
                />
              </form>

            </ImageAndTextBlock>
            <Navigation showOnMobile={true}>
              <TextButton>
                <JssLink field={props.fields.BackLink}>
                  <Icons iconName="iconArrowSmallLeft" />
                  {props.fields.BackLink.value.text}
                </JssLink>
              </TextButton>

              <Button size={'small'} variation={'full-dark'}>
                <button
                  disabled={
                    searchStringPayment === '' && !isSelfPayment ? true : false
                  }
                  onClick={() => {
                    if (searchStringLocations !== 'London' && searchStringLocations !== 'Anywhere') {
                      router.push(
                        `/finder/step-consultant-cards?search=${search}&keywordId=${keywordId}&sortType=relevance&lat=${lat || '51.507217'}&lon=${lon || '-0.1275862'}&distance=${distance || 0}&limit=12&offset=0${isSelfPayment
                          ? ''
                          : `&insurer=${selectedInsurerPaymentStep}`
                        }`
                      )
                    } else {
                      router.push(
                        `${props.fields.NextLink.value.href ||
                        '/finder/step-locations'
                        }?keywordId=${keywordId}&searchString=${search}${isSelfPayment
                          ? ''
                          : `&insurer=${selectedInsurerPaymentStep}`
                        }`
                      )
                    }
                  }
                  }
                >
                  <span>{props.fields.NextLink.value.text}</span>
                </button>
              </Button>

            </Navigation>
          </>
        )}
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
