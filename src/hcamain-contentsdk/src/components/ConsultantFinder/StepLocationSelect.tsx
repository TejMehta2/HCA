/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX, Suspense } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import Container from '@component-library/foundation/Containers/Container';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import SelectLocation from '@component-library/consultant-finder/SelectLocation/SelectLocation';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import axios from 'axios';
import Headline from '@component-library/consultant-finder/Headline/Headline';
import { getQueryValue } from './routeQuery';

interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  API_C2_GetConsultantDetails_BaseURL: Field<string>;
  CardTimeIcon: any;
  CantFindBannerText: Field<string>;
  CantFindPhoneNumber: Field<string>;
  CantFindIcon: any;
  HeadingText: Field<string>;
  ViewMapText: Field<string>;
  ResultsLink: Field<string>;
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

const DefaultContent = (props: StepProps): JSX.Element => {
  const {
    setSelectedTypeOfAppointment,
    setConsultantGUID,
    setHcaConsultantID,
    setConsultantName,
    setConsultantMainSpecialty,
  } = useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  //console.log('step location', props.fields);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [keywordId, setKeywordId] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState('');
  const baseURL_C2 =
    props?.fields?.API_C2_GetConsultantDetails_BaseURL?.value ||
    'https:/api/C2/GetLDBConsultantDetails?';
  const [locations, setLocations] = useState([]);
  const [loading, seLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // get search from URL
    setSearch(getQueryValue(searchParams, 'search'));

    // get keywordId from URL
    setKeywordId(getQueryValue(searchParams, 'keywordId'));

    // get slug from URL
    const slug = getQueryValue(searchParams, 'slug');
    setSlug(slug);

    // get name from URL
    setName(getQueryValue(searchParams, 'name'));

    // get gmc number from URL
    const gmcNumber = getQueryValue(searchParams, 'gmcNumber');
    setGmcNumber(gmcNumber);

    // get reviews total number from URL
    const reviewsTotal = searchParams.get('reviewsTotal');
    setReviewsTotal(Number(reviewsTotal));

    // get isFollowup from URL
    const isFollowUpAppointment = searchParams.get('isFollowOnAppointment');
    if (isFollowUpAppointment) {
      setSelectedTypeOfAppointment(isFollowUpAppointment?.toString());
    }

    const requestURL_C2 = `${baseURL_C2}&gmcNumber=${gmcNumber}&isFollowOnAppointment=${isFollowUpAppointment}`;

    //console.log('locations DoctifyURL', requestURL_C2);

    axios
      .get(requestURL_C2)
      .then((res) => {
        // console.log('locations results', res);
        seLoading(false);
        setError(false);
        setLocations(res?.data?.availability || []);
        setConsultantGUID(res?.data?.CRMID || '');
        setHcaConsultantID(res?.data?.professionalRegistrationNumber || '');
        setConsultantName(`${res?.data?.firstName} ${res?.data?.lastName}`);
        setConsultantMainSpecialty(res?.data?.providerMainSpecialty || '');
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {(
          <>
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                  slug={slug}
                  gmcNumber={gmcNumber}
                  reviewsTotal={reviewsTotal}
                  name={name}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline
              withConsultantName={true}
              name={name}
              slug={slug}
              gmcNumber={gmcNumber}
              reviewsTotal={reviewsTotal || 0}
              backLink={props?.fields?.BackLink?.value?.href}
              headingText={props?.fields?.HeadingText?.value ||
                'Please select a location'}
              backLinkText={props.fields.BackLink.value.text || 'Back'}
              resultsLink={props?.fields?.ResultsLink?.value || '/finder/step-consultant-cards'}
              search={search}
              keywordId={keywordId}
            >
            </Headline>
            {!loading && !error && (
              <SelectLocation
                cantFindIcon={<SitecoreSvg>
                  {props?.fields?.CantFindIcon?.fields?.SvgMarkup?.value}
                </SitecoreSvg>}
                cantFindTitle={<Text tag="p" variation="body-medium-large">
                  {props?.fields?.CantFindBannerText?.value}
                </Text>}
                cantFindNumber={props?.fields?.CantFindPhoneNumber?.value}
                nextLink={`${props?.fields?.NextLink?.value?.href ||
                  '/finder/step-slot-select'
                  }?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`}
                locations={locations}
                viewOnMapText={props?.fields?.ViewMapText?.value ||
                  'View location on Google Maps'}
                noLocationsMsg={''}
                icon={
                  <SitecoreSvg>
                    {props?.fields?.CardTimeIcon?.fields?.SvgMarkup?.value}
                  </SitecoreSvg>
                }
                iconPhone={
                  <Icons iconName="iconPhone" />
                }
                isSelected={isSelected}
                setIsSelected={setIsSelected}
              />
            )}
            {loading && <LoaderCF loadingMsg={'Loading...'} />}
            {!loading && error && (
              <div>There was an error, please try again</div>
            )}
            <Navigation showOnMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value?.href}?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    disabled={isSelected === '' ? true : false}
                    onClick={() =>
                      router.push(
                        `${props?.fields?.NextLink?.value?.href ||
                        '/finder/step-slot-select'
                        }?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}&search=${search}&keywordId=${keywordId}`
                      )
                    }
                  >
                    <span>
                      {props?.fields?.NextLink?.value?.text || 'Next'}
                    </span>
                  </button>
                </Button>
              </Container>
            </Navigation>
          </>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};

export const Default = (props: StepProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);
